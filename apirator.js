import { json } from 'express'
import creds from './apikey.js'

export default {
  'sendPromt': async function (ip, message) {
    let link = creds.hook
    let res = await fetch(link, {
      method: 'POST',
      body: JSON.stringify({ ip, message })
    })

    return res.json()
  }
}
