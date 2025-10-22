class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ErrorHandler';

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
