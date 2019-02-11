/**
 * @function - Handles api response
 * @param {Object} response - the response of the api
 * @param {Numeber} statusCode - the status code of the response of the api
 * @param {String} message - the message to be sent in the response of the api
 * @param {String} message - the message to be sent in the response of the api
 * @param {*} value - the value to be sent in the response of the api
 * @return response object
 */
const handleResponse = (response, statusCode, message, value) => {
  return response.status(statusCode).json({ msg: message, value: value })
}

/**
 * @function - Handles invalid requests to api
 * @param {Object} request - the request to the api
 * @param {String} parameter - a parameter in request body
 * @return Error object or false
 */
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
