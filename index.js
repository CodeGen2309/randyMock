import { Telegraf, Markup } from 'telegraf'

import express from 'express'
import bodyParser from 'body-parser'

import cors from 'cors'
import dbinter from './dbinter.js'
import apirator from './apirator.js'

// TG BOT ----------------------------------------------------------

let token = '8326567347:AAHUoulUtbwwf9DHcu1gKvVxnWGrw3sX5Uc'
let bot = new Telegraf(token)
let botUrl = 'https://jrjcdr.ru/'

bot.command('start', (ctx) => {
  ctx.reply(
    'Привет! Пришли мне любой фильм и я сделаю его вместо тебя',
    Markup.keyboard([
        Markup.button.webApp(' Открыть апку', botUrl)
    ])
  )

})



bot.launch()


// EXPRESS SERVER ----------------------------------------------------------
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


// TODO: Докрутить сценарии если нету боди и текcта
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

  randy = { title: 'NO FILMS', desc: '', poster: '#' }
  
  if (data.count > 0) { 
    randy = Math.floor(Math.random() * data.count)
  }

  
  res.send(data.items[randy])
})


app.post('/save-film/', async (req, res) => {
  let test, body, status
  
  try { test = req.body.title } 
  catch (e) { return res.send('HAVE NO FILM DATA') }

  body = req.body
  status = await db.saveFilm(
    body.locale, body.title, body.poster, body.desc
  )


  res.set('content-type', 'application/json')
  res.send(status)
})



app.listen(port, (err) => {
  if (err) { return console.log(err) }
  console.log(`Example app listening on port ${port}`)
})
