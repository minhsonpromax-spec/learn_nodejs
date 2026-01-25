export const successResponse = (res, data, options = {}) => {
  const {status = 200, pagination = null, message = "Success"} = options

  const response = {success: true, message, data}

  if (pagination) 
    response.pagination = pagination
  return res.status(status).json(response)
}


