/**
 * Handler for 'open' event
 */
const onOpen = () => {
  console.log('Websocket connection opened!')
}

/**
 * Handler for 'error' event
 */
const onError = (error) => {
  console.log('Received error event!')
  console.log('error stacktrace: ', error.stack)
}

/**
 * Handler for 'close' event
 */
const onClose = (code, reason) => {
  console.log('Connection closed!')
  console.log('code=', code)
  console.log('reason=', reason)
}

/**
 * Handler for 'unexpected-response' event
 */
const onUnexpectedResponse = (request, response) => {
  console.log('Unexpected response!')
  console.log('request=', request)
  console.log('response=', response)
}

module.exports = { onOpen, onError, onClose, onUnexpectedResponse }
