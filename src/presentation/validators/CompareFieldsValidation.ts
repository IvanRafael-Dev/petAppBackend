import { InvalidParamError } from '../errors/InvalidParamError';
import { type Validation } from './interfaces/Validation';

export class CompareFieldsValidation implements Validation {
  private readonly fieldName: string;
  private readonly fieldToCompareName: string;

  constructor (fieldName: string, fieldToCompareName: string) {
    this.fieldName = fieldName;
    this.fieldToCompareName = fieldToCompareName;
  }

  validate (input: any): Error | void {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(`${this.fieldName} and ${this.fieldToCompareName} must be equal`);
    }
  }
}
