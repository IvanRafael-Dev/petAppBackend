import { type HttpResponse } from '../interfaces/Http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    error: error.message
  }
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
});
