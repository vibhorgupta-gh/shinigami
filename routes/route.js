const express = require('express')
const path = require('path')
const passport = require('passport')
const jwtStrategy = require('../middleware/passport.js')
const { handleResponse, handleInvalidRequest } = require('../middleware/validator.js')
const { token, patchJson, download, encodedThumbnail } = require('../controllers/helpers.js')
const router = express.Router()

passport.use(jwtStrategy)

/**
 * @api {post} /login - stateless jwt login
 * @apiSuccess {String} msg - success message
 * @apiSuccess {String} value - jwt token
 * @apiSuccessExample {JSON} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "msg": "success",
 *      "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaW5pZ2FtaSIsImlhdCI6MTU0OTkwNjg5MSwiZXhwIjoxNTQ5OTA2OTExfQ.VRW_Lqdb8roNu6TWH3AE63I3ZF4BogYj2_uv_h1m_Kk"
 *    }
 * @apiErrorExample {JSON} Error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "msg": "failure"
 *    }
 */
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

/**
 * @api {post} /patch - patch JSON object
 * @apiSuccess {String} msg - success message
 * @apiSuccess {Object} value - patched JSON object
 * @apiSuccessExample {JSON} Success
 *    HTTP/1.1 200 OK
 {
    "msg": "success",
    "value": {
        "foo": "bar",
        "baz": "boo"
    }
}
 * @apiErrorExample {JSON} Error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "msg": "failure"
 *    }
 */
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

/**
 * @api {post} /thumbnail - download image from path
 * @apiSuccess {String} msg - success message
 * @apiSuccess {String} value - base64 encoded thumbnail
 * @apiSuccessExample {JSON} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "msg": "success",
 *      "value": "<base64 encoding>"
 *    }
 * @apiErrorExample {JSON} Error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "msg": "failure"
 *    }
 */
router.post('/thumbnail', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    let invalidRequest = handleInvalidRequest(req, 'url')
    if (invalidRequest) {
      return handleResponse(res, 501, invalidRequest.message)
    }
    let { url } = req.body
    let downloadPath = path.join(__dirname, '../images', '/image.png')
    let thumbnailPath = path.join(__dirname, '../images', '/output.png')

    await download(url, downloadPath, thumbnailPath)
    let thumbnail = encodedThumbnail(thumbnailPath)
    if (thumbnail) {
      return handleResponse(res, 200, 'success', thumbnail)
    } else {
      return handleResponse(res, 401, 'failure')
    }
})

module.exports = router

