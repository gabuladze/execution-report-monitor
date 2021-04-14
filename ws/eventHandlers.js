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

const onClose = (code, reason) => {
  console.log('Connection closed!')
  console.log('code=', code)
  console.log('reason=', reason)
}

module.exports = { onOpen, onError, onClose }
