const HttpClient = require('../api/httpClient')
const MarketDataService = require('../api/marketDataService.js')

let MarketDataServiceInstance
beforeAll(async () => {
  MarketDataServiceInstance = new MarketDataService({ HttpClient })
})

describe('Test MarketDataService', () => {
  test('getExchangeInfo must return exchange info', async () => {
    // Arrange
    expect.assertions(6)

    // Act
    const result = await MarketDataServiceInstance.getExchangeInfo()

    // Assert
    expect(result).toHaveProperty('timezone')
    expect(result).toHaveProperty('serverTime')
    expect(result).toHaveProperty('rateLimits')
    expect(result).toHaveProperty('exchangeFilters')
    expect(result).toHaveProperty('symbols')
    expect(result.symbols).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          symbol: expect.any(String),
          baseAsset: expect.any(String),
          quoteAsset: expect.any(String),
          filters: expect.any(Array)
        })
      ])
    )
  })
})
