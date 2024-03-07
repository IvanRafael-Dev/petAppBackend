import { ValidationComposite } from '../../../presentation/validators/ValidationComposite';
import { type Validation } from '../../../presentation/validators/interfaces/Validation';

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | void {}
  }

  return new ValidationStub();
};

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidationStub(), makeValidationStub()];
  const sut = new ValidationComposite(validationStubs);
  return { sut, validationStubs };
};

describe('#ValidationComposite', () => {
  it('should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut();
    const error = new Error('any_error');
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(error);
    const response = sut.validate({ field: 'any_value' });
    expect(response).toEqual(error);
  });

  it('should return the first error if more than one validation fails', () => {
    const { sut, validationStubs } = makeSut();
    const error = new Error('first_error');
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(error);
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new Error('second_error'));
    const response = sut.validate({ field: 'any_value' });
    expect(response).toEqual(error);
  });
});
