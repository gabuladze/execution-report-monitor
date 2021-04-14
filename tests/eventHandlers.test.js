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
})
