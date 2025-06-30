import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

export default class {
  constructor () {
    this.db = null
  }

  async setConnection (basefile) {
    this.db = await open({
      filename: basefile,
      driver: sqlite3.Database
    })

    return this
  }


  async getPromts (locale) {
    let sql = 'SELECT * FROM promts WHERE locale = ?'
    let data = await this.db.get(sql, [ locale ])
    console.log({data});
    return data
  }

  async getRandomFilm (locale) {}
  async saveFilm () {}
}