const Service = require('./service.js')

class MarketDataService extends Service {
  /**
   * Returns exchange info from `GET /v3/exchangeInfo`
   * @async
   */
  async getExchangeInfo () {
    try {
      const response = await this.HttpClient.get('/v3/exchangeInfo')

      return response.data
    } catch (error) {
      console.log('Error when fetching exchange info')
      console.log(error.stack)
      if (error.response) {
        console.log('error.response.data=', error.response.data)
      }
    }
  }
}

module.exports = MarketDataService
