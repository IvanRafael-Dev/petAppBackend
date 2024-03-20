import { InvalidParamError } from '../../errors/InvalidParamError';
import { type Validation } from '../../validators/interfaces/Validation';
import { type EmailValidator } from './interface/EmailValidator';

export class EmailValidation implements Validation {
  private readonly emailValidator: EmailValidator;

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  validate (input: Record<string, string>): Error | void {
    const isValid = this.emailValidator.isValid(input.email);
    if (!isValid) {
      return new InvalidParamError('email');
    }
  }
}
