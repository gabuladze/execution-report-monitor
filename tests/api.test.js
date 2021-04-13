const querystring = require('querystring')
const crypto = require('crypto')
const API = require('../api')
const { SECRET } = require('../config')

describe('Test API functions', () => {
  test('getHeaders must return content-type & apikey headers', async () => {
    // Arrange
    expect.assertions(2)
    const paramString = querystring.stringify({ testParam1: 'someVal', testParam2: ['a', 'b', 'c'] })
    const signature = crypto.createHmac('sha512', SECRET).update(paramString).digest('hex')

    // Act
    const result = API.getHeaders(paramString)

    // Assert
    expect(result).toHaveProperty('Content-Type', 'application/x-www-form-urlencoded')
    expect(result).toHaveProperty('X-MBX-APIKEY', signature)
  })
})
