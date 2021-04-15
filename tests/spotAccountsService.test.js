const HttpClient = require('../api/httpClient')
const SpotAccountService = require('../api/spotAccountsService.js')

let SpotAccountServiceInstance
beforeAll(async () => {
  SpotAccountServiceInstance = new SpotAccountService({ HttpClient })
})

describe('Test SpotAccountService', () => {
  test('getAccountInfo must return current account info', async () => {
    // Arrange
    expect.assertions(14)

    // Act
    const result = await SpotAccountServiceInstance.getAccountInfo()

    // Assert
    expect(result).toHaveProperty('makerCommission')
    expect(result).toHaveProperty('makerCommission')
    expect(result).toHaveProperty('takerCommission')
    expect(result).toHaveProperty('buyerCommission')
    expect(result).toHaveProperty('sellerCommission')
    expect(result).toHaveProperty('canTrade')
    expect(result).toHaveProperty('canWithdraw')
    expect(result).toHaveProperty('canDeposit')
    expect(result).toHaveProperty('updateTime')
    expect(result).toHaveProperty('accountType')
    expect(result).toHaveProperty('balances')
    expect(Array.isArray(result.balances)).toBe(true)
    expect(Array.isArray(result.permissions)).toBe(true)
    expect(result.balances).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          asset: expect.any(String),
          free: expect.any(String),
          locked: expect.any(String)
        })
      ])
    )
  })
})
