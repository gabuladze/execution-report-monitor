const eventHandlers = require('../ws/eventHandlers.js')

describe('Test API functions', () => {
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
    expect.assertions(3)
    const consoleSpy = jest.spyOn(console, 'log')
    const testCode = 1006
    const testReason = 'close'

    // Act
    eventHandlers.onClose(testCode, testReason)

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith('Connection closed!')
    expect(consoleSpy).toHaveBeenCalledWith('code=', testCode)
    expect(consoleSpy).toHaveBeenCalledWith('reason=', testReason)
  })
})
