import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

export default class {
  constructor () {
    this.db = null
  }

  
  async setConnection (basefile) {
    this.db = await open({
      filename: basefile,
      driver:   sqlite3.Database
    })

    return this
  }


  async getPromts (locale) {
    let sql  = 'SELECT * FROM promts WHERE locale = ?'
    let data = await this.db.get(sql, [ locale ])
    return data
  }


  async getFilmsByLocale (locale) {
    let sql  = 'SELECT * FROM films WHERE locale = ?'
    let data = await this.db.all(sql, [ locale ])
    let res  = { items: data, count: data.length }
    return res
  }


  async checkCachedFilm (locale, title) {
    let sql  = 'SELECT * FROM films WHERE locale = ? AND title = ?'
    let data = await this.db.get(sql, [ locale, title ])
    return data
  }
  

  async saveFilm (locale, title, poster, desc) {
    let filmIsSaved, sql, data

    filmIsSaved = await this.checkCachedFilm(locale, title)
    if (filmIsSaved) { return filmIsSaved }

    sql  = 'INSERT INTO films (locale, title, poster, desc) VALUES (?, ?, ?, ?)'
    data = await this.db.run(sql, [ locale, title, poster, desc ])
    return data
  }
}