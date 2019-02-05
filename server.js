const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const { url } = require('./config.js')

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

mongoose.connect(url, { useNewUrlParser : true })
mongoose.connection.on('error', ()=>{ console.log('Error connecting to database') })
mongoose.connection.once('open', ()=>{ console.log('Connection made') })

app.listen(4000, ()=>{
  console.log('Server running')
})