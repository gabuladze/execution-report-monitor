const HttpClient = require('../api/httpClient')
const SpotAccountsService = require('../api/spotAccountsService.js')

async function start () {
  try {
    const SpotAccountsServiceInstance = new SpotAccountsService({ HttpClient })

    const testOrderParams = {
      symbol: 'BNBBUSD',
      side: 'SELL',
      type: 'MARKET',
      quantity: '10',
      timestamp: Date.now()
    }

    console.log('Sending test order with params:', testOrderParams)
    console.log('Please check the app log for websocket messages')

    await SpotAccountsServiceInstance.newOrder(testOrderParams)
  } catch (error) {
    console.log('Error:', error.stack)
  }
}

start()
