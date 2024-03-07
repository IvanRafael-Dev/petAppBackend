import { type IValidationComposite, type Validation } from './interfaces/Validation';

export class ValidationComposite implements IValidationComposite {
  private readonly validations: Validation[];

  constructor (validations: Validation[]) {
    this.validations = validations;
  }

  validate (input: any): Error | void {
    for (const validation of this.validations) {
      const error = validation.validate(input);
      if (error) {
        return error;
      }
    }
  }

  add (validation: Validation): void {
    this.validations.push(validation);
  }
}
