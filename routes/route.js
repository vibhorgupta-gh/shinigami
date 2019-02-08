const express = require('express')
const router = express.Router()
const { login, patch, thumbnail } = require('../controllers/helpers.js')

router.post('/login', login)
router.post('/patch', patch)
router.post('/thumbnail', thumbnail)

module.exports = router

