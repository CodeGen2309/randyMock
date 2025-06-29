import express from 'express'
import sqlite3 from 'sqlite3'

let app = express()
let port = 3000
let db = new sqlite3.Database(
  './mockdb.sqlite', sqlite3.OPEN_READWRITE, err => logger(err, 'connected to db')
)

app.get('/', (req, res) => {
  res.set('content-type', 'application/json')
  let sql = 'SELECT * FROM promts'

  db.all(sql, [], (err, data) => {
    if (err) { return console.log(err) }

    let content = JSON.stringify(data)
    res.send(content)
  })
})




app.listen(port, (err) => {
  if (err) { return console.log(err) }

  console.log(`Example app listening on port ${port}`)
})
