
const WebSocket = require('ws')
const { STREAM_WS_URL } = require('../config')
const eventHandlers = require('./eventHandlers.js')
const HttpClient = require('../api/httpClient.js')
const UserDataStreamsService = require('../api/userDataStreamsService.js')

let conn = null // Websocket connection instance

const init = async () => {
  try {
    console.log('Initializing the connection to websocket server...')
    const UserDataStreamsServiceInstance = new UserDataStreamsService({ HttpClient })
    const { listenKey } = await UserDataStreamsServiceInstance.createListenKey()
    
    console.log(`Created listen key... listenKey=${listenKey}`)
    // By convention, the stream is available at /ws/<listenKey>
    const streamUrl = `${STREAM_WS_URL}/${listenKey}`

    if (!conn) {
      conn = new WebSocket(streamUrl)
      conn.on('open', eventHandlers.onOpen)

      // conn.on('ping', (data) => {
      //   console.log('received ping')
      //   console.log('data=', data.toJSON())
      // })

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
