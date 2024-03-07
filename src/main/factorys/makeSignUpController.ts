import { SignUpController } from '../../presentation/controllers/SignUpController';
import { RequiredFieldsValidation } from '../../presentation/validators/RequiredFieldsValidation';
import { ValidationComposite } from '../../presentation/validators/ValidationComposite';

export const makeValidationComposite = (): ValidationComposite => {
  const validationComposite = new ValidationComposite([]);
  return validationComposite;
};

export const makeSignUpController = (): SignUpController => {
  const validationComposite = makeValidationComposite();
  const requiredFields = new RequiredFieldsValidation(['username', 'email', 'password', 'passwordConfirmation']);
  validationComposite.add(requiredFields);
  const signUpController = new SignUpController(validationComposite);
  return signUpController;
};
