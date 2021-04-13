
const WebSocket = require('ws')
const { STREAM_WS_URL } = require('../config')
const API = require('../api')

let conn = null // Websocket connection instance

const init = async () => {
  try {
    console.log('Initializing the connection to websocket server...')
    const { listenKey } = await API.createListenKey()
    // const listenKey='mz3VxKVVj615gXgijvxm8YznAxy02LhoIRUCdnOj39c3aR8qGRHP1OtrhrgT'
    // const listenKey = 'mz3VxKVVj615gXgijvxm8YznAxy02LhoIRUCdnOj39c3aR8qGRHP1OtrhrgT'
    console.log(`Created listen key... listenKey=${listenKey}`)
    // By convention, the stream is available at /ws/<listenKey>
    const streamUrl = `${STREAM_WS_URL}/${listenKey}`

    if (!conn) {
      console.log(streamUrl)
      conn = new WebSocket(streamUrl)
      conn.on('open', () => {
        console.log('CONNECTION OPENED')
      })

      conn.on('ping', (data) => {
        console.log('PING')
        console.log('data=', data)
      })

      conn.on('pong', (data) => {
        console.log('PONG')
        console.log('data=', data)
      })

      conn.on('message', (message) => {
        console.log('RECEIVED MESSAGE')
        console.log('message=', message)
      })
      conn.on('error', (error) => {
        console.log('RECEIVED ERROR')
        console.log('error=', error)
      })
      conn.on('close', (code, reason) => {
        console.log('CONNECTION CLOSE')
        console.log('code=', code)
        console.log('reason=', reason)
      })
      conn.on('unexpected-response', (request, response) => {
        console.log('UNEXPECTED-RESPONSE')
        // console.log('request=', request)
        // console.log('response=', response)
      })
    }

    console.log('Websocket connection has been initialized!')
  } catch (error) {
    console.log('Error when initializing websocket connection:')
    console.log(error.stack)
  }
}

module.exports = { init }