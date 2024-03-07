import { type Validation } from '../validators/interfaces/Validation';
import { SignUpController } from './SignUpController';
import { type HttpRequest } from './interfaces/Http';

type FakeHttpRequestFields = 'username' | 'email' | 'password' | 'passwordConfirmation';

const makeHttpRequestBody = (missingField?: FakeHttpRequestFields): HttpRequest => {
  const body = {
    username: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  };

  if (!missingField) {
    return { body };
  }

  const { [missingField]: _, ...outputBody } = body;
  return { body: outputBody };
};

interface SutTypes {
  sut: SignUpController
  validationStub: Validation
}

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | void {}
  }

  return new ValidationStub();
};

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub();
  const signUpController = new SignUpController(validationStub);
  return {
    sut: signUpController,
    validationStub
  };
};

describe('#SignUpController', () => {
  it('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validationSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = makeHttpRequestBody();
    await sut.handle(httpRequest);
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  it('should return 400 if no username is provided', async () => {
    const { sut, validationStub } = makeSut();

    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new Error('Missing param: username'));

    const httpRequest = makeHttpRequestBody('username');
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({ message: 'Missing param: username' });
  });

  it('should return 400 if no email is provided', async () => {
    const { sut, validationStub } = makeSut();

    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new Error('Missing param: email'));
    const httpRequest = makeHttpRequestBody('email');

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({ message: 'Missing param: email' });
  });

  it('should return 400 if no password is provided', async () => {
    const { sut, validationStub } = makeSut();

    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new Error('Missing param: password'));

    const httpRequest = makeHttpRequestBody('password');

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({ message: 'Missing param: password' });
  });

  it('should return 400 if no password confirmation is provided', async () => {
    const { sut, validationStub } = makeSut();

    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new Error('Missing param: passwordConfirmation'));

    const httpRequest = makeHttpRequestBody('passwordConfirmation');

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({ message: 'Missing param: passwordConfirmation' });
  });
});
