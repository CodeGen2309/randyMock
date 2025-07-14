import express from 'express'
import bodyParser from 'body-parser'

import cors from 'cors'
import dbinter from './dbinter.js'
import apirator from './apirator.js'


let app = express()
let port = 3000
let db = await new dbinter().setConnection('./mockdb.sqlite')


app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/get-promts/:locale', async (req, res) => {
  let locale, data

  res.set('content-type', 'application/json')
  locale = req.params.locale
  data   = await db.getPromts(locale)

  res.send(data)
})


app.get('/get-random-film/:locale', async (req, res) => {
  let locale, promts, data, saved

  res.set('content-type', 'application/json')
  locale = req.params.locale
  promts = await db.getPromts(locale)

  // { locale, title, poster, desc }
  data   = await apirator.getFilm(promts.start_promt)

  saved  = await db.saveFilm(
    locale, data.title, data.poster, data.desc
  )

  console.log(data);
  res.send(data)
})


// TODO: Докрутить сценарии если нету боди и тескта
app.post('/send-promt', async (req, res) => {
  let promt, data, ip


  try { promt = req.body.promt } 
  catch (e) { return res.send('HAVE NO PROMT') }

  console.log("SEND PROMT")

  res.set('content-type', 'application/json')
  ip = req.ip

  promt = req.body.promt
  data = await apirator.sendPromt(ip, promt)

  console.log(data)
  res.send(data)
})


app.get('/get-cached-film/:locale', async (req, res) => {
  let locale, randy, data

  res.set('content-type', 'application/json')
  locale = req.params.locale
  data   = await db.getFilmsByLocale(locale)

  randy = false
  if (data.count > 0) { 
    randy = Math.floor(Math.random() * data.count)
  }

  
  res.send(data.items[randy])
})




app.listen(port, (err) => {
  if (err) { return console.log(err) }
  console.log(`Example app listening on port ${port}`)
})
