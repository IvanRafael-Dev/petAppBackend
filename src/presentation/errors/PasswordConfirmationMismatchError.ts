export class PasswordConfirmationMismatchError extends Error {
  constructor (message: string) {
    super(message);
    this.name = 'PasswordConfirmationMismatchError';
  }
}
