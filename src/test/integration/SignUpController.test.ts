import supertest from 'supertest';
import { app } from '../../main/app/api';

const request = supertest(app);

describe('#SignUpController', () => {
  it('should return 400 if no username is provided', async () => {
    const httpResponse = await request
      .post('/signup')
      .send({});

    expect(httpResponse.status).toBe(400);
    expect(httpResponse.body).toEqual({ message: 'Missing param: username' });
  });

  it('should return 400 if no email is provided', async () => {
    const httpResponse = await request
      .post('/signup')
      .send({ username: 'any_username' });

    expect(httpResponse.status).toBe(400);
    expect(httpResponse.body).toEqual({ message: 'Missing param: email' });
  });

  it('should return 400 if no password is provided', async () => {
    const httpResponse = await request
      .post('/signup')
      .send({ username: 'any_username', email: 'any_email' });

    expect(httpResponse.status).toBe(400);
    expect(httpResponse.body).toEqual({ message: 'Missing param: password' });
  });

  it('should return 400 if no passwordConfirmation is provided', async () => {
    const httpResponse = await request
      .post('/signup')
      .send({ username: 'any_username', email: 'any_email', password: 'any_password' });

    expect(httpResponse.status).toBe(400);
    expect(httpResponse.body).toEqual({ message: 'Missing param: passwordConfirmation' });
  });

  it('should return 400 if passwordConfirmation fails', async () => {
    const httpResponse = await request
      .post('/signup')
      .send({ username: 'any_username', email: 'any_email', password: 'any_password', passwordConfirmation: 'invalid_password' });

    expect(httpResponse.status).toBe(400);
    expect(httpResponse.body).toEqual({ message: 'Invalid param: passwordConfirmation' });
  });
});
