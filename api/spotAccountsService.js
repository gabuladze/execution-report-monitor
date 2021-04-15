const querystring = require('querystring')
const Service = require('./service.js')

class SpotAccountsService extends Service {
  /**
   * Returns account info from `GET /api/v3/account`
   * @async
   */
  async getAccountInfo () {
    try {
      const params = { timestamp: Date.now() }
      const paramString = querystring.stringify(params)

      // Add HMAC signature to param string
      params.signature = this.getSignature(paramString)

      const response = await this.HttpClient.get('/v3/account', { params })

      return response.data
    } catch (error) {
      console.log('Error when fetching account info')
      console.log(error.stack)
      if (error.response) {
        console.log('error.response.data=', error.response.data)
      }
    }
  }

  /**
   * Returns account info from `GET /api/v3/account`
   * @async
   */
  async storeOrder () {
    try {
      const params = {
        symbol: 'BNBBUSD',
        side: 'SELL',
        type: 'MARKET',
        quantity: '10',
        timestamp: Date.now()
      }
      const paramString = querystring.stringify(params)

      // Add HMAC signature to param string
      params.signature = this.getSignature(paramString)

      const response = await this.HttpClient.post('/v3/order', null, { params })

      return response.data
    } catch (error) {
      console.log('Error when sending order')
      console.log(error.stack)
      if (error.response) {
        console.log('error.response.data=', error.response.data)
      }
    }
  }
}

module.exports = SpotAccountsService
