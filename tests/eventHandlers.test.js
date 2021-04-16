const eventHandlers = require('../ws/eventHandlers.js')
const { X } = require('../config')

describe('Test websocket event handlers', () => {
  test('onOpen must log correct message', async () => {
    // Arrange
    expect.assertions(1)
    const consoleSpy = jest.spyOn(console, 'log')
    const expectedMessage = 'Websocket connection opened!'

    // Act
    eventHandlers.onOpen()

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(expectedMessage)
  })

  test('onError must log correct message', async () => {
    // Arrange
    expect.assertions(1)
    const consoleSpy = jest.spyOn(console, 'log')
    const expectedMessage = 'Received error event!'
    const testError = new Error('ERR_TEST_ERROR')

    // Act
    eventHandlers.onError(testError)

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(expectedMessage)
  })

  test('onClose must log close code & reason', async () => {
    // Arrange
    expect.assertions(4)
    const consoleSpy = jest.spyOn(console, 'log')
    const params = { code: 1006, wasClean: false, reason: '' }

    // Act
    eventHandlers.onClose(params)

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith('Connection closed!')
    expect(consoleSpy).toHaveBeenCalledWith('code=', params.code)
    expect(consoleSpy).toHaveBeenCalledWith('reason=', params.reason)
    expect(consoleSpy).toHaveBeenCalledWith('wasClean=', params.wasClean)
  })

  test('onUnexpectedResponse must log correct message', async () => {
    // Arrange
    expect.assertions(3)
    const consoleSpy = jest.spyOn(console, 'log')
    const testReqObj = {}
    const testResObj = {}

    // Act
    eventHandlers.onUnexpectedResponse(testReqObj, testResObj)

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith('Unexpected response!')
    expect(consoleSpy).toHaveBeenCalledWith('request=', testReqObj)
    expect(consoleSpy).toHaveBeenCalledWith('response=', testResObj)
  })

  test('onMessage must log correct message if delay < X', async () => {
    // Arrange
    expect.assertions(1)
    const consoleSpy = jest.spyOn(console, 'log')
    const message = {
      e: 'executionReport',
      E: Date.now() - Math.floor(X / 2),
      s: 'ETHBTC',
      c: 'mUvoqJxFIILMdfAW5iGSOW',
      S: 'BUY',
      o: 'LIMIT',
      f: 'GTC',
      q: '1.00000000',
      p: '0.10264410',
      P: '0.00000000',
      F: '0.00000000',
      g: -1,
      C: null,
      x: 'NEW',
      X: 'NEW',
      r: 'NONE',
      i: 4293153,
      l: '0.00000000',
      z: '0.00000000',
      L: '0.00000000',
      n: '0',
      N: null,
      T: 1499405658657,
      t: -1,
      I: 8641984,
      w: true,
      m: false,
      M: false,
      O: 1499405658657,
      Z: '0.00000000',
      Y: '0.00000000',
      Q: '0.00000000'
    }
    const params = {
      data: JSON.stringify(message)
    }
    const expectedMessage = expect.stringContaining(`executionReport has been delivered in under ${X}ms. orderId=${message.i} eventTime=${message.E}`)

    // Act
    eventHandlers.onMessage(params)

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(expectedMessage)
  })

  test('onMessage must log correct message if delay >= X', async () => {
    // Arrange
    expect.assertions(1)
    const consoleSpy = jest.spyOn(console, 'log')
    const message = {
      e: 'executionReport',
      E: Date.now() - X * 2,
      s: 'ETHBTC',
      c: 'mUvoqJxFIILMdfAW5iGSOW',
      S: 'BUY',
      o: 'LIMIT',
      f: 'GTC',
      q: '1.00000000',
      p: '0.10264410',
      P: '0.00000000',
      F: '0.00000000',
      g: -1,
      C: null,
      x: 'NEW',
      X: 'NEW',
      r: 'NONE',
      i: 4293153,
      l: '0.00000000',
      z: '0.00000000',
      L: '0.00000000',
      n: '0',
      N: null,
      T: 1499405658657,
      t: -1,
      I: 8641984,
      w: true,
      m: false,
      M: false,
      O: 1499405658657,
      Z: '0.00000000',
      Y: '0.00000000',
      Q: '0.00000000'
    }
    const params = {
      data: JSON.stringify(message)
    }
    const expectedMessage = expect.stringContaining(`executionReport has been delivered delayed >= ${X}ms. orderId=${message.i} eventTime=${message.E}`)

    // Act
    eventHandlers.onMessage(params)

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(expectedMessage)
  })
})
