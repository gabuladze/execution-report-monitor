
const WebSocket = require('ws')
const ReconnectingWebsocket = require('reconnecting-websocket')
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
      conn = new ReconnectingWebsocket(streamUrl, [], { WebSocket })
      conn.addEventListener('open', eventHandlers.onOpen)
      conn.addEventListener('message', eventHandlers.onMessage)
      conn.addEventListener('error', eventHandlers.onError)
      conn.addEventListener('close', eventHandlers.onClose)
    }

    console.log('Websocket connection has been initialized!')
  } catch (error) {
    console.log('Error when initializing websocket connection:')
    console.log(error.stack)
  }
}

module.exports = { init }
