const querystring = require('querystring')
const crypto = require('crypto')
const API = require('../api')
const { API_KEY, SECRET } = require('../config')

describe('Test API functions', () => {
  test('getSignature must return correct sha256 HMAC signature for passed param string', async () => {
    // Arrange
    expect.assertions(1)
    const paramString = querystring.stringify({
      symbol: 'LTCBTC',
      side: 'BUY',
      type: 'LIMIT',
      timeInForce: 'GTC',
      quantity: 1,
      price: 0.1,
      recvWindow: 5000,
      timestamp: 1499827319559
    })
    const expectedSignature = crypto.createHmac('sha256', SECRET).update(paramString).digest('hex')

    // Act
    const result = API.getSignature(paramString)

    // Assert
    expect(result).toHaveProperty('signature', expectedSignature)
  })
  test('getHeaders must return content-type & apikey headers', async () => {
    // Arrange
    expect.assertions(2)

    // Act
    const result = API.getHeaders()

    // Assert
    expect(result).toHaveProperty('Content-Type', 'application/x-www-form-urlencoded')
    expect(result).toHaveProperty('X-MBX-APIKEY', API_KEY)
  })

  test.skip('createListenKey must return new listen key', async () => {
    // Arrange
    expect.assertions(1)

    // Act
    const result = API.createListenKey()
    console.log(result)
    // Assert
    expect(result).toHaveProperty('listenKey')
  })
})
