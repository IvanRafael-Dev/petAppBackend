import { type Validation } from '../validators/interfaces/Validation';
import { type Controller } from './interfaces/Controller';
import { type HttpRequest, type HttpResponse } from './interfaces/Http';

export class SignUpController implements Controller {
  private readonly validation: Validation;

  constructor (validation: Validation) {
    this.validation = validation;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse | any> {
    const error = this.validation.validate(httpRequest.body);
    if (error) {
      return {
        statusCode: 400,
        body: {
          message: error.message
        }
      };
    }
  }
}
