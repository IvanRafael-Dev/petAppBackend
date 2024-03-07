export interface Validation {
  validate (input: any): Error | void
}

export interface IValidationComposite extends Validation {
  add (validation: Validation): void
}
