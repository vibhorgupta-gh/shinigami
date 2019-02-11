const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./routes/route.js')
const morgan = require('morgan')
const winston = require('./middleware/logger.js')

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('combined', { stream: winston.stream }))

app.use('/', router)
app.get('*', (req, res, next) => { res.status(404).send('404: Not found') })

app.listen(4000, () => {
  console.log('Server started on port 4000')
})

module.exports = app
