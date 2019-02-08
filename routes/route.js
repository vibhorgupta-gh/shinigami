import express from 'express'
import passport from 'passport'
import jwtStrategy from '../passport/jwt'
import { login, patch, thumbnail } from '../controllers/helpers.js'

const router = express.Router()
passport.use(jwtStrategy)

router.post('/login', login)
router.post('/patch', passport.authenticate('jwt', { session: false }), patch)
router.post('/thumbnail', passport.authenticate('jwt', { session: false }), thumbnail)

module.exports = router

