const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwtStrategy  = require('../passport/jwt')
const { login, patch, thumbnail } = require('../controllers/helpers.js')

passport.use(jwtStrategy)

router.post('/login', login)
router.post('/patch', passport.authenticate('jwt', { session: false }), patch)
router.post('/thumbnail', passport.authenticate('jwt', { session: false }), thumbnail)

module.exports = router

