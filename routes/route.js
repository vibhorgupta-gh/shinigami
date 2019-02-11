const express = require('express')
const fs = require('fs')
const passport = require('passport')
const jwtStrategy = require('../middleware/passport.js')
const { handleResponse, handleInvalidRequest } = require('../middleware/validator.js')
const { token, patchJson, download } = require('../controllers/helpers.js')
const router = express.Router()

passport.use(jwtStrategy)

router.post('/login', (req, res, next) => {
    let invalidRequest = handleInvalidRequest(req, 'username') || handleInvalidRequest(req, 'password')
    if (invalidRequest) {
      return handleResponse(res, 501, invalidRequest.message)
    }
    let { username, password} = req.body
    let jwtToken = token(username, password)
    if (jwtToken) {
      return handleResponse(res, 200, 'success', jwtToken)
    } else {
      return handleResponse(res, 401, 'failure')
    }

})

router.post('/patch', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let invalidRequest = handleInvalidRequest(req, 'object')
    if (invalidRequest) {
      return handleResponse(res, 501, invalidRequest.message)
    }
    let { object, patch } = req.body
    let patchedObject = patchJson(object, patch)
    if (patchedObject) {
      return handleResponse(res, 200, 'success', patchedObject)
    } else {
      return handleResponse(res, 401, 'failure')
    }
})

router.post('/thumbnail', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    let invalidRequest = handleInvalidRequest(req, 'url')
    if (invalidRequest) {
      return handleResponse(res, 501, invalidRequest.message)
    }
    let { url } = req.body
    let downloadPath = __dirname + '/image.png'
    let writeStream = fs.createWriteStream(downloadPath)

    let data = await download(url, downloadPath)
    data.pipe(writeStream)
      .on('finish', () => {
        return handleResponse(res, 200, 'success')
      })
      .on('error', () => {
        return handleResponse(res, 401, 'failure')
      })
})

module.exports = router

