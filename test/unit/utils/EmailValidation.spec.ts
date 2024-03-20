import { type EmailValidator } from './../../../src/presentation/utils/email/interface/EmailValidator';
import { type EmailValidatorAdapter } from '@/presentation/utils/email/EmailValidator';
import { EmailValidation } from './../../../src/presentation/utils/email/EmailValidationAdapter';
import { InvalidParamError } from '@/presentation/errors/InvalidParamError';

interface SutTypes {
  sut: EmailValidation
  emailValidatorStub: EmailValidatorAdapter
}

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidatorStub();
  const sut = new EmailValidation(emailValidatorStub);
  return { sut, emailValidatorStub };
};

describe('#EmailValidation', () => {
  it('should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    sut.validate({ email: 'any_email' });
    expect(isValidSpy).toHaveBeenCalledWith('any_email');
  });
});
