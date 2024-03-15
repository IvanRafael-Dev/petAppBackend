/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type Controller } from '@/presentation/interfaces/Controller';
import { expressRouteAdapter } from '../../../src/main/frameworks/express-route-adapter';
import { type HttpRequest } from '@/presentation/interfaces/Http';
import { type Request, type Response, type NextFunction } from 'express';

export interface ExpressRequestMockType extends Request {
  body: any
  headers: any
  params: any
}

export interface ExpressResponseMockType extends Response {
  status: jest.Mock<any, [number]>
  json: jest.Mock<any, [any]>
}

export interface ExpressReqResStubTypes {
  req: ExpressRequestMockType
  res: ExpressResponseMockType
  next: jest.Mock<NextFunction>
}

// Function to create stubs for req, res, and next
const makeReqResStub = (): ExpressReqResStubTypes => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as ExpressResponseMockType;

  const req = {
    body: { content: 'any' },
    headers: { headers: 'any' },
    params: { param: 'any' }
  } as ExpressRequestMockType;

  const next: jest.Mock<NextFunction> = jest.fn();

  return { req, res, next };
};

// Mock Controller Creation
const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<any> {}
  }

  return new ControllerStub();
};

describe('#ExpressRouteAdapter', () => {
  it('should call controller with correct values', async () => {
    const { req, res, next } = makeReqResStub();
    const controllerStub = makeControllerStub();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    expressRouteAdapter(controllerStub)(req, res, next);

    const expectedHttpRequest: HttpRequest = {
      body: req.body,
      headers: req.headers,
      params: req.params
    };

    expect(handleSpy).toHaveBeenCalledWith(expectedHttpRequest);
  });

  it('should return 500 if controller throws', async () => {
    const { req, res, next } = makeReqResStub();
    const controllerStub = makeControllerStub();
    const error = new Error('any_error');
    jest.spyOn(controllerStub, 'handle').mockImplementationOnce(() => {
      throw error;
    });

    expressRouteAdapter(controllerStub)(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: error.message,
      stack: error.stack
    });
  });

  it('should return 500 if an unknown error occurs', async () => {
    const { req, res, next } = makeReqResStub();
    const controllerStub = makeControllerStub();
    jest.spyOn(controllerStub, 'handle').mockImplementationOnce(() => {
      throw {};
    });

    expressRouteAdapter(controllerStub)(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});
