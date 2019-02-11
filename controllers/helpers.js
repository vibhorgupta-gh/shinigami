const { apply_patch } = require('jsonpatch')
const jwt = require('jsonwebtoken')
const path = require('path')
const axios = require('axios')
const { secret } = require('../config.js')

/**
 * @function - Generate jwt signed token
 * @param {String} username - username from request body
 * @param {String} password - password from request body
 * @return {String} jwt token
 */
const token = (username, password) => {
  if (username && password) {
    let options = {}
    options.expiresIn = 20
    return jwt.sign({ username }, secret, options)
  }
  return null
}

/**
 * @function - Patch JSON objects
 * @param {Object} object - object to be patched from request body
 * @param {Object} patch - patch to apply from request body
 * @return {Object} patchedObject | object - modified/same object
 */
const patchJson = (object, patch) => {
  if (object && patch) {
    let patchedObject = apply_patch(object, patch)
    return patchedObject
  }
  return object
}

/**
 * @async
 * @function - Download image from url
 * @param {String} url - image url from request body
 * @param {String} downloadPath - path to download image
 * @return data stream of downloaded image
 */
const download = async (url, downloadPath) => {
  const options = {
    width: 50,
    height: 50
  }
  const request = await axios({
    url: 'https://google.com',
    method: 'GET'
  })
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
    headers: { 'Cookie': request.headers['set-cookie'] }
  })
  return response.data
}

module.exports = {
  token,
  patchJson,
  download
}
