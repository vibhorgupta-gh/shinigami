const express = require('express')
const fs = require('fs')
const passport = require('passport')
const jwtStrategy = require('../middleware/passport.js')
const { handleResponse, handleInvalidRequest } = require('../middleware/valid.js')
const { token, patchJson, download } = require('../controllers/helpers.js')
const router = express.Router()

passport.use(jwtStrategy)

router.post('/login', (req, res, next) => {
    let { username, password} = req.body
    let invalidRequest = handleInvalidRequest(req, 'username') || handleInvalidRequest(req, 'password')
    if (invalidRequest) handleResponse(res, 501, invalidRequest.message)
    let jwtToken = token(username, password)
    jwtToken ? handleResponse(res, 200, 'success', jwtToken) : handleResponse(res, 401, 'failure')
})

router.post('/patch', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let { object, patch } = req.body
    let invalidRequest = handleInvalidRequest(req, 'object') || handleInvalidRequest(req, 'patch')
    if (invalidRequest) handleResponse(res, 501, invalidRequest.message)
    let patchedObject = patchJson(object, patch)
    patchedObject ? handleResponse(res, 200, 'success', patchedObject) : handleResponse(res, 401, 'failure', object)
})

router.post('/thumbnail', passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    let { url } = req.body
    let invalidRequest = handleInvalidRequest(req, 'url')
    if (invalidRequest) handleResponse(res, 501, invalidRequest.message)
    let downloadPath = __dirname + '/image.png'
    let writeStream = fs.createWriteStream(downloadPath)

    let data = await download(url, downloadPath)
    data.pipe(writeStream)
      .on('finish', () => { handleResponse(res, 200, 'success') })
      .on('error', () => { handleResponse(res, 401, 'failure') })
})

module.exports = router

