const handleResponse = (response, statusCode, message, value) => {
  return response.status(statusCode).json({msg: message, value: value})
}

const handleInvalidRequest = (request, parameter) => {
  if (!request.body.hasOwnProperty(parameter)) {
    return new Error('Invalid or incomplete parameters')
  }
  return false
}

module.exports = {
  handleResponse,
  handleInvalidRequest
}