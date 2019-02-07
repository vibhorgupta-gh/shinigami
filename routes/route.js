import express from 'express'
const router = express.Router()
import { login, patch, thumbnail } from '../controllers/helpers.js'

router.post('/login', login)
router.post('/patch', patch)
router.post('/thumbnail', thumbnail)

module.exports = router

