import { InvalidParamError } from '../errors/InvalidParamError';
import { type EmailValidator } from '../utils/email/interface/EmailValidator';
import { type Validation } from './interfaces/Validation';

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
