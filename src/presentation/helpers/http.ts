import { type HttpResponse } from '../controllers/interfaces/Http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    error: error.message
  }
});
