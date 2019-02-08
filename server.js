import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import router from './routes/route.js'

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

app.use('/', router)
app.get('*', (req,res,next) => { res.status(404).send('404: Not found') })
app.use((err, req, res, next) => { res.status(500).json({ msg: 'Internal server error', err }) })

app.listen(4000, ()=>{
  console.log('Server running')
})