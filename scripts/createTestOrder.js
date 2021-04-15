const HttpClient = require('../api/httpClient')
const SpotAccountsService = require('../api/spotAccountsService.js')
const MarketDataService = require('../api/marketDataService.js')

async function start () {
  try {
    const args = process.argv.slice(2)
    const symbol = args[0]
    const side = args[1]
    const quantity = args[2]

    if (args.length === 0) throw new Error('symbol, side & quantity arguments are required!')
    if (!symbol) throw new Error('symbol argument is required!')
    if (!side) throw new Error('side argument is required!')
    if (!['BUY', 'SELL'].includes(side)) throw new Error('invalid side argument value! must be: BUY or SELL')
    if (!quantity) throw new Error('quantity argument is required!')
    if (quantity <= 0) throw new Error('quantity must be > 0!')

    const MarketDataServiceInstance = new MarketDataService({ HttpClient })
    const SpotAccountsServiceInstance = new SpotAccountsService({ HttpClient })

    const exchangeInfo = await MarketDataServiceInstance.getExchangeInfo()

    // Find specified symbol
    const symbolInfo = exchangeInfo.symbols.filter(s => s.symbol === symbol)[0]
    if (!symbolInfo) throw new Error(`${symbol} not found!`)

    const { baseAsset, quoteAsset } = symbolInfo

    const accountInfo = await SpotAccountsServiceInstance.getAccountInfo()

    // Find balance for baseAsset if we are selling, otherwise for quoteAsset
    const requiredAsset = side === 'SELL' ? baseAsset : quoteAsset
    const balance = accountInfo.balances.filter(b => b.asset === requiredAsset)[0]
    if (Number(balance.free) < quantity) throw new Error(`Insufficient funds! quantity=${quantity} balance=${balance.free}`)

    const testOrderParams = {
      symbol,
      side,
      type: 'MARKET',
      quantity,
      timestamp: Date.now()
    }

    console.log('Sending test order with params:', testOrderParams)
    console.log('Please check the app log for websocket messages')

    const responseData = await SpotAccountsServiceInstance.newOrder(testOrderParams)
    console.log('Response data: ', responseData)
  } catch (error) {
    console.log(error.stack)
  }
}

start()
