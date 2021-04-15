const querystring = require('querystring')
const crypto = require('crypto')
const { getSignature } = require('../api/crypto.js')
const { SECRET } = require('../config')

describe('Test crypto', () => {
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
    const result = getSignature(paramString, SECRET)

    // Assert
    expect(result).toEqual(expectedSignature)
  })
})
