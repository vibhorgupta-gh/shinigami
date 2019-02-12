const fs = require('fs')
const { apply_patch } = require('jsonpatch')
const jwt = require('jsonwebtoken')
const sharp = require('sharp')
const base64 = require('base64-img')
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
 * @param {String} thumbnailPath - path to generated thumbnail
 * @return data stream of downloaded image
 */
const download = async (url, downloadPath, thumbnailPath) => {
  let writeStream = fs.createWriteStream(downloadPath)
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
  response.data.pipe(writeStream)
    .on('finish', () => { resizeImage(downloadPath, thumbnailPath, options) })
    .on('error', () => { throw new Error('Couldn\'t download image') })
}

/**
 * @function - Resize downloaded image
 * @param {String} downloadPath - path to downloaded image
 * @param {String} thumbnailPath - path to create thumbnail
 * @param {Object} options - resizing options
 */
const resizeImage = (downloadPath, thumbnailPath, options) => {
  sharp(downloadPath)
    .resize(options)
    .toFile(thumbnailPath)
    .then(() => console.log('Image downloaded at ' + thumbnailPath))
    .catch(err => console.error('Write error: ' + err))
}

/**
 * @function - Return base64 encoded image
 * @param {String} imagePath - path to thumbnail
 * @return base64 string
 */
const encodedThumbnail = (imagePath) => {
  return base64.base64Sync(imagePath)
}

module.exports = {
  token,
  patchJson,
  download,
  resizeImage,
  encodedThumbnail
}
