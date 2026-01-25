export class AppError extends Error {
  constructor(message,code = 1111, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.code = code
    Error.captureStackTrace(this, this.constructor)
  }
}

