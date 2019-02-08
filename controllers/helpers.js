const fs = require('fs-extra')
const { apply_patch } = require('jsonpatch')
const jwt = require('jsonwebtoken')
const path = require('path')
const axios = require('axios')
const { secret } = require('../config.js')


const login = (req, res) => {
  const { username, password } = req.body
  if (username && password) {
    let options = {}
    options.expiresIn = 120;
    let token = jwt.sign({ username }, secret, options);
    return res.status(200).json({token: token, msg: 'success'})
  }
  return res.status(401).json({ msg: 'failed' })
}

const patch = (req, res) => {
  const { object, patch } = req.body
  if (object && patch) {
    let patchedObject = apply_patch(object, patch)
    return res.status(200).json({result: patchedObject, msg: 'success'})
  }
  return res.status(401).json({ msg: 'failed' })
}

const thumbnail = async(req, res, next) => {

  const { url } = req.body
  const downloadPath = __dirname + '/image.png'
  const thumbnailPath = __dirname + '/thumbnail.png'

  const writeStream = fs.createWriteStream(downloadPath)
  const readStream = fs.createReadStream(thumbnailPath)

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

  response.data.pipe(writeStream)
    .on('finish', () => { res.status(200).json({ msg: 'success' }) })
    .on('error', () => { res.status(401).json({ msg: 'failed' }) })
}

module.exports = {
  login: login,
  patch: patch,
  thumbnail: thumbnail
}