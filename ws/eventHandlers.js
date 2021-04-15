const { X } = require('../config')

/**
 * Handler for 'open' event
 */
const onOpen = () => {
  console.log('Websocket connection opened!')

  return true
}

/**
 * Handler for 'error' event
 */
const onError = (error) => {
  console.log('Received error event!')
  console.log('error stacktrace: ', error.stack)

  return true
}

/**
 * Handler for 'close' event
 */
const onClose = (code, reason) => {
  console.log('Connection closed!')
  console.log('code=', code)
  console.log('reason=', reason)

  return true
}

/**
 * Handler for 'unexpected-response' event
 */
const onUnexpectedResponse = (request, response) => {
  console.log('Unexpected response!')
  console.log('request=', request)
  console.log('response=', response)

  return true
}

/**
 * Handler for 'message' event
 */
const onMessage = (message) => {
  const { data } = message
  const messageJson = JSON.parse(data)

  // Ignore events other than 'executionReport'
  if (messageJson.e !== 'executionReport') return true

  const eventTime = messageJson.E
  const orderId = messageJson.i
  const receiveTs = Date.now()
  const delay = receiveTs - eventTime
  const delayedUpToX = delay <= X
  if (delayedUpToX) {
    console.log(`executionReport has been delivered delayed up to ${X}ms. orderId=${orderId} eventTime=${eventTime} receiveTs=${receiveTs}`)
  } else {
    console.log(`executionReport has been delivered delayed over ${X}ms. orderId=${orderId} eventTime=${eventTime} receiveTs=${receiveTs}`)
  }

  return true
}

module.exports = { onOpen, onError, onClose, onUnexpectedResponse, onMessage }
