import express from 'express'
import jwt from 'jsonwebtoken'
import { secret } from '../config.js'
import { login, patch, thumbnail, logout } from '../controllers/helpers.js'
const router = express.Router()

router.post('login', login)
router.post('patch', patch)
router.post('thumbnail', thumbnail)
router.post('logout', logout)

module.exports = router

