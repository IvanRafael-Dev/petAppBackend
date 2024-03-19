import { SignUpController } from '@/presentation/controllers/SignUpController';
import { type HttpRequest } from '@/presentation/interfaces/Http';
import { MissingParamError } from '@/presentation/errors/MissingParamError';
import { type Validation } from '@/presentation/validators/interfaces/Validation';
import { InvalidParamError } from '@/presentation/errors/InvalidParamError';

type FakeHttpRequestFields = 'username' | 'email' | 'password' | 'passwordConfirmation';

type FakeHttpRequestBody = Record<FakeHttpRequestFields, string>;

export const makeHttpRequestBody = (missingField?: FakeHttpRequestFields, update?: Partial<FakeHttpRequestBody>): HttpRequest => {
  const body = {
    username: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  };

  Object.assign(body, update);

  if (!missingField) return { body };

  const { [missingField]: _, ...invalidBody } = body;
  return { body: invalidBody };
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
      .mockReturnValueOnce(new MissingParamError('username'));

    const httpRequest = makeHttpRequestBody('username');
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({ error: 'Missing param: username' });
  });

  it('should return 400 if no email is provided', async () => {
    const { sut, validationStub } = makeSut();

    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('email'));
    const httpRequest = makeHttpRequestBody('email');

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({ error: 'Missing param: email' });
  });

  it('should return 400 if no password is provided', async () => {
    const { sut, validationStub } = makeSut();

    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('password'));

    const httpRequest = makeHttpRequestBody('password');

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({ error: 'Missing param: password' });
  });

  it('should return 400 if no passwordConfirmation is provided', async () => {
    const { sut, validationStub } = makeSut();

    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('passwordConfirmation'));

    const httpRequest = makeHttpRequestBody('passwordConfirmation');

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({ error: 'Missing param: passwordConfirmation' });
  });

  it('should return 400 if password confirmation fails', async () => {
    const { sut, validationStub } = makeSut();

    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new InvalidParamError('password and passwordConfirmation must be equal'));

    const httpRequest = makeHttpRequestBody(undefined, { passwordConfirmation: 'invalid_password' });

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({ error: 'Invalid param: password and passwordConfirmation must be equal' });
  });
});
