const Service = require('./service.js')

class SpotAccountsService extends Service {
  /**
   * Returns account info from `GET /api/v3/account`
   * @async
   */
  async getAccountInfo () {
    try {
      const params = { timestamp: Date.now() }

      const response = await this.HttpClient.get('/v3/account', { params, secure: true })

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
   * @param {object} params - Object with order params
   */
  async newOrder (params) {
    try {
      if (!params) throw new Error('ERR_PARAMS_REQUIRED')

      const response = await this.HttpClient.post('/v3/order', null, { params, secure: true })

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
