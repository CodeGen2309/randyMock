import creds from './apikey.js'

export default {
  async sendPromt (ip, message) {
    let link, req, res

    link = creds.hook
    req = await fetch(link, {
      method: 'POST',
      body: JSON.stringify({ ip, message })
    })

    return await req.json()
  },


  parseResponse (data) {
    let clean = data[0]['output']
      .replaceAll('\n', '')
      .replaceAll('```', '')
      .replaceAll("'", '"')
    .replaceAll('json', '')

    return JSON.parse(clean)
  }
}
