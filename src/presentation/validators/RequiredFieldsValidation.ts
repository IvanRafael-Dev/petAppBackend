import { MissingParamError } from '../errors/MissingParamError';
import { type Validation } from './interfaces/Validation';

export class RequiredFieldsValidation implements Validation {
  private readonly fieldName: string[];

  constructor (fieldName: string[]) {
    this.fieldName = fieldName;
  }

  validate (input: any): Error | void {
    for (const fieldName of this.fieldName) {
      if (!input[fieldName]) {
        return new MissingParamError(fieldName);
      }
    }
  }
}
