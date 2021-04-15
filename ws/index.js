
const WebSocket = require('ws')
const { STREAM_WS_URL } = require('../config')
const API = require('../api')
const eventHandlers = require('./eventHandlers.js')

let conn = null // Websocket connection instance

const init = async () => {
  try {
    console.log('Initializing the connection to websocket server...')
    // const { listenKey } = await API.createListenKey()
    // const listenKey='mz3VxKVVj615gXgijvxm8YznAxy02LhoIRUCdnOj39c3aR8qGRHP1OtrhrgT'
    const listenKey = 'mz3VxKVVj615gXgijvxm8YznAxy02LhoIRUCdnOj39c3aR8qGRHP1OtrhrgT'
    console.log(`Created listen key... listenKey=${listenKey}`)
    // By convention, the stream is available at /ws/<listenKey>
    const streamUrl = `${STREAM_WS_URL}/${listenKey}`

    if (!conn) {
      conn = new WebSocket(streamUrl)
      conn.on('open', eventHandlers.onOpen)

      //   conn.on('ping', (data) => {
      //     console.log('received ping')
      //     console.log('data=', data.toJSON())
      //   })

      //   conn.on('pong', (data) => {
      //     console.log('PONG')
      //     console.log('data=', data)
      //   })

      conn.on('message', eventHandlers.onMessage)
      conn.on('error', eventHandlers.onError)
      conn.on('close', eventHandlers.onClose)
      conn.on('unexpected-response', eventHandlers.onUnexpectedResponse)
    }

    console.log('Websocket connection has been initialized!')
  } catch (error) {
    console.log('Error when initializing websocket connection:')
    console.log(error.stack)
  }
}

module.exports = { init }
