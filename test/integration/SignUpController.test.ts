import { app } from '@/main/app/api';
import supertest from 'supertest';

const request = supertest(app);

describe('#SignUpController', () => {
  it('should return 400 if no username is provided', async () => {
    const httpResponse = await request
      .post('/signup')
      .send({});

    expect(httpResponse.status).toBe(400);
    expect(httpResponse.body).toEqual({ error: 'Missing param: username' });
  });

  it('should return 400 if no email is provided', async () => {
    const httpResponse = await request
      .post('/signup')
      .send({ username: 'any_username' });

    expect(httpResponse.status).toBe(400);
    expect(httpResponse.body).toEqual({ error: 'Missing param: email' });
  });

  it('should return 400 if no password is provided', async () => {
    const httpResponse = await request
      .post('/signup')
      .send({ username: 'any_username', email: 'any_email' });

    expect(httpResponse.status).toBe(400);
    expect(httpResponse.body).toEqual({ error: 'Missing param: password' });
  });

  it('should return 400 if no passwordConfirmation is provided', async () => {
    const httpResponse = await request
      .post('/signup')
      .send({ username: 'any_username', email: 'any_email', password: 'any_password' });

    expect(httpResponse.status).toBe(400);
    expect(httpResponse.body).toEqual({ error: 'Missing param: passwordConfirmation' });
  });

  it('should return 400 if passwordConfirmation fails', async () => {
    const httpResponse = await request
      .post('/signup')
      .send({ username: 'any_username', email: 'any_email', password: 'any_password', passwordConfirmation: 'invalid_password' });

    expect(httpResponse.status).toBe(400);
    expect(httpResponse.body).toEqual({ error: 'Invalid param: password and passwordConfirmation must be equal' });
  });

  it('should return 400 if an invalid email is provided', async () => {
    const httpResponse = await request
      .post('/signup')
      .send({ username: 'any_username', email: 'invalid_email', password: 'any_password', passwordConfirmation: 'any_password' });

    expect(httpResponse.status).toBe(400);
    expect(httpResponse.body).toEqual({ error: 'Invalid param: email' });
  });

  it('should return 200 if valid data is provided', async () => {
    const httpResponse = await request
      .post('/signup')
      .send({ username: 'any_username', email: 'valid_email@mail.com', password: 'any_password', passwordConfirmation: 'any_password' });

    expect(httpResponse.status).toBe(201);
  });
});
