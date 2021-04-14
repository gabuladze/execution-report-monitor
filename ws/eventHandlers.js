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

module.exports = { onOpen, onError }
