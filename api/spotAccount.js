const axios = require('axios')
const querystring = require('querystring')
const { API_URL } = require('../config')
const { getSignature, getHeaders } = require('./utils.js')

/**
 * Returns account info from `GET /api/v3/account`
 * @async
 */
const getAccountInfo = async () => {
  try {
    const url = `${API_URL}/v3/account`
    const headers = getHeaders()
    const params = { timestamp: Date.now() }
    const paramString = querystring.stringify(params)

    // Add HMAC signature to param string
    params.signature = getSignature(paramString)

    const response = await axios.get(url, { params, headers })

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
const storeOrder = async () => {
  try {
    const url = `${API_URL}/v3/order`
    const headers = getHeaders()
    const params = {
      symbol: 'BNBBUSD',
      side: 'SELL',
      type: 'MARKET',
      quantity: '10',
      // price: '87',
      timestamp: Date.now()
    }
    const paramString = querystring.stringify(params)

    // Add HMAC signature to param string
    params.signature = getSignature(paramString)

    const response = await axios.post(url, null, { params, headers })

    return response.data
  } catch (error) {
    console.log('Error when sending order')
    console.log(error.stack)
    if (error.response) {
      console.log('error.response.data=', error.response.data)
    }
  }
}

module.exports = { getAccountInfo, storeOrder }
