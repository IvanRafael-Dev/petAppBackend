import { SignUpController } from '@/presentation/controllers/SignUpController';
import { RequiredFieldsValidation } from '@/presentation/validators/RequiredFieldsValidation';
import { ValidationComposite } from '@/presentation/validators/ValidationComposite';

export const makeSignUpValidationComposite = (): ValidationComposite => {
  const validationComposite = new ValidationComposite([]);
  const requiredFields = new RequiredFieldsValidation(['username', 'email', 'password', 'passwordConfirmation']);
  validationComposite.add(requiredFields);
  return validationComposite;
};

export const makeSignUpController = (): SignUpController => {
  const validationComposite = makeSignUpValidationComposite();
  const signUpController = new SignUpController(validationComposite);
  return signUpController;
};
