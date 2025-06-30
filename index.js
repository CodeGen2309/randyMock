import express from 'express'
import dbinter from './dbinter.js'
import apirator from './apirator.js'


let app = express()
let port = 3000
let db = await new dbinter().setConnection('./mockdb.sqlite')
let neiro = new apirator()



app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/get-promts/:locale', async (req, res) => {
  res.set('content-type', 'application/json')
  let test = await db.getPromts(req.params.locale)
  console.log(test.start_promt);
  res.send(test)
})


app.get('/get-random-film/:locale', async (req, res) => {
  res.set('content-type', 'application/json')
  let promts = await db.getPromts(req.params.locale)
  let data = await neiro.getFilm(promts.start_promt)
  console.log(data);
  res.send(data)
})




app.listen(port, (err) => {
  if (err) { return console.log(err) }
  console.log(`Example app listening on port ${port}`)
})
