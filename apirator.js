import { json } from 'express'
import creds from './apikey.js'

export default {
  async sendPromt (ip, message) {
    let link, req, res

    link = creds.hook
    req = await fetch(link, {
      method: 'POST',
      body: JSON.stringify({ ip, message })
    })

    res = await req.json().then(raw => {
      let clean = raw[0]['output']
        .replaceAll('\n', '')
        .replaceAll('```', '')
        .replaceAll("'", '"')
      .replaceAll('json', '')

      let parsed = JSON.parse(clean)
      return parsed
    })

    return res
  },


  parseResponse (data) {
    let raw, formatted

    console.log(data);
    

    raw = data.replace('```', '').replace('json', '')
    formatted = JSON.parse(raw)

    return(formatted)    
  }
}
