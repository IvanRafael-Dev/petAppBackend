import { EmailValidation } from '@/presentation/validators/EmailValidationAdapter';
import { SignUpController } from '@/presentation/controllers/SignUpController';
import { CompareFieldsValidation } from '@/presentation/validators/CompareFieldsValidation';
import { RequiredFieldsValidation } from '@/presentation/validators/RequiredFieldsValidation';
import { ValidationComposite } from '@/presentation/validators/ValidationComposite';
import { EmailValidatorAdapter } from '@/presentation/utils/email/EmailValidator';

export const makeEmailValidation = (): EmailValidation => {
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const emailValidation = new EmailValidation(emailValidatorAdapter);
  return emailValidation;
};

export const makeSignUpValidationComposite = (): ValidationComposite => {
  const validationComposite = new ValidationComposite([]);
  const requiredFields = new RequiredFieldsValidation(['username', 'email', 'password', 'passwordConfirmation']);
  const compareFields = new CompareFieldsValidation('password', 'passwordConfirmation');
  const emailValidator = makeEmailValidation();
  validationComposite.add(requiredFields);
  validationComposite.add(compareFields);
  validationComposite.add(emailValidator);
  return validationComposite;
};

export const makeSignUpController = (): SignUpController => {
  const validationComposite = makeSignUpValidationComposite();
  const signUpController = new SignUpController(validationComposite);
  return signUpController;
};
