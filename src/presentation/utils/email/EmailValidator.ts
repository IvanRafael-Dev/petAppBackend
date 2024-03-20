import validator from 'validator';
import { type EmailValidator } from './interface/EmailValidator';

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email);
  }
}
