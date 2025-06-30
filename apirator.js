import creds from './apikey.js'

export default class {
  async getFilm (message) {
    let hook = creds.hook
    let res = await fetch(hook, {
      method: 'POST',
      body: JSON.stringify(message)
    })

    return res.json()
  }

  async sendMessage () {}
  async getAnother () {}
}