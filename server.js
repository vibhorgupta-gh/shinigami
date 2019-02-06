import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

app.listen(4000, ()=>{
  console.log('Server running')
})