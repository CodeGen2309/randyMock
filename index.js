import express from 'express'
import cors from 'cors'
import dbinter from './dbinter.js'
import apirator from './apirator.js'


let app = express()
let port = 3000
let db = await new dbinter().setConnection('./mockdb.sqlite')
let neiro = new apirator()


app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})


// for test
app.get('/check-film/:locale', async (req, res) => {
  let locale, content,
  data

  res.set('content-type', 'application/json')
  locale = req.params.locale
  data = await db.getFilmsByLocale(locale)


  console.log(data);
  res.send(data)
})


app.get('/get-promts/:locale', async (req, res) => {
  let locale, data

  res.set('content-type', 'application/json')
  locale = req.params.locale
  data   = await db.getPromts(locale)

  console.log(data);
  res.send(data)
})


app.get('/get-random-film/:locale', async (req, res) => {
  let locale, promts, data, saved

  res.set('content-type', 'application/json')
  locale = req.params.locale
  promts = await db.getPromts(locale)

  // { locale, title, poster, desc }
  console.log('PROMT SENDED');
  data   = await neiro.getFilm(locale, promts.start_promt)

  saved  = await db.saveFilm(
    locale, data.title, data.poster, data.desc
  )

  console.log(data);
  res.send(data)
})


app.get('/send-promt/:text', async (req, res) => {
  let text, data

  res.set('content-type', 'application/json')
  text = req.params.text
  data = await neiro.getFilm(text)

  console.log(data);
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