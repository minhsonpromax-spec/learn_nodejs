export const successResponse = (res, data, options = {}) => {
  const {status = 200, pagination = null} = options;

  const response = {success: true, data};

  if (pagination) 
    response.pagination = pagination;
  
  return res.status(status).json(response);
}

export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
  }
}
