import { SignUpController } from './SignUpController';
import { type HttpRequest } from './interfaces/Http';

type FakeHttpReqesutFields = 'username' | 'email' | 'password' | 'passwordConfirmation';

const makeHttpRequestBody = (missingField?: FakeHttpReqesutFields): HttpRequest => {
  const body = {
    username: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  };

  if (!missingField) {
    return { body };
  }

  const { [missingField]: _, ...newBody } = body;
  return { body: newBody };
};

describe('#SignUpController', () => {
  it('should return 400 if no name is provided', async () => {
    const sut = new SignUpController();
    const httpRequest = makeHttpRequestBody('username');

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: username'));
  });
});
