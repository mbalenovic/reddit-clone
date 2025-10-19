export class AppError extends Error {
  constructor(public field: string, public message: string) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
