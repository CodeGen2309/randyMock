import creds from './apikey.js'

export default class {
  async getFilm (locale, message) {
    let hook = creds.test
    let link = `${hook}?locale=${locale}`
    let res = await fetch(link, {
      method: 'POST',
      body: message
    })

    return res.json()
  }

  async sendMessage () {}
  async getAnother () {}
}