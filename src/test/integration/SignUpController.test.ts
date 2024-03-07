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
});
