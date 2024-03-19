import { PasswordConfirmationMismatchError } from '../errors/PasswordConfirmationMismatchError';
import { badRequest, created } from '../helpers/http';
import { type Validation } from '../validators/interfaces/Validation';
import { type Controller } from '../interfaces/Controller';
import { type HttpRequest, type HttpResponse } from '../interfaces/Http';

export class SignUpController implements Controller {
  private readonly validation: Validation;

  constructor (validation: Validation) {
    this.validation = validation;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body);
    if (error) {
      return badRequest(error);
    }

    const { password, passwordConfirmation } = httpRequest.body;
    if (password !== passwordConfirmation) {
      return badRequest(new PasswordConfirmationMismatchError('password and confirmation must be equal'));
    }

    return created({});
  }
}
