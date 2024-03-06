import { type Controller } from './interfaces/Controller';
import { type HttpRequest, type HttpResponse } from './interfaces/Http';

export class SignUpController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse | any> {
    const requiredFields = ['username', 'email'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new Error(`Missing param: ${field}`)
        };
      }
    }
  }
}
