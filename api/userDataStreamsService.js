const Service = require('./service')

class UserDataStreamsService extends Service {
  /**
   * Returns new listenKey
   * The lilistenKey is valid for 60 minutes unless a keepalive is sent.
   * @async
   */
  async createListenKey () {
    try {
      const response = await this.HttpClient.post('/v3/userDataStream', '')

      return response.data
    } catch (error) {
      console.log('Error when creating listen key')
      console.log(error.stack)
      if (error.response) {
        console.log('error.response.data=', error.response.data)
      }
    }
  }
}

module.exports = UserDataStreamsService
