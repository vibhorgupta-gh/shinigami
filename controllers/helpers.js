const { apply_patch } = require('jsonpatch')
const jwt = require('jsonwebtoken')
const path = require('path')
const axios = require('axios')
const { secret } = require('../config.js')


const token = (username, password) => {
  if (username && password) {
    let options = {}
    options.expiresIn = 120;
    return jwt.sign({ username }, secret, options);
  }
  return null
}

const patchJson = (object, patch) => {
  if (object && patch) {
    let patchedObject = apply_patch(object, patch)
    return patchedObject
  }
  return object
}

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
    headers: { 'Cookie' : request.headers['set-cookie'] }
  })
  return response.data
}

module.exports = {
  token,
  patchJson,
  download
}