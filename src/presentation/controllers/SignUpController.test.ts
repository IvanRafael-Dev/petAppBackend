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

describe('#SignUpController', () => {
  it('should return 400 if no name is provided', async () => {
    const sut = new SignUpController();
    const httpRequest = makeHttpRequestBody('username');

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: username'));
  });

  it('should return 400 if no email is provided', async () => {
    const sut = new SignUpController();
    const httpRequest = makeHttpRequestBody('email');

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: email'));
  });

  it('should return 400 if no password is provided', async () => {
    const sut = new SignUpController();
    const httpRequest = makeHttpRequestBody('password');

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: password'));
  });
});
