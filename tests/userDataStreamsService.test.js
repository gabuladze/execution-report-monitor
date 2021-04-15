const HttpClient = require('../api/httpClient')
const { API_KEY, SECRET } = require('../config')
const UserDataStreamsService = require('../api/userDataStreamsService.js')

let UserDataStreamsServiceInstance
beforeAll(async () => {
  UserDataStreamsServiceInstance = new UserDataStreamsService({ HttpClient, apiKey: API_KEY, apiSecret: SECRET })
})

describe('Test UserDataStreamsService', () => {
  test('createListenKey must return new listen key', async () => {
    // Arrange
    expect.assertions(1)

    // Act
    const result = await UserDataStreamsServiceInstance.createListenKey()

    // Assert
    expect(result).toHaveProperty('listenKey')
  })
})
