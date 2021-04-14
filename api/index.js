const axios = require('axios')
const crypto = require('crypto')
const querystring = require('querystring')

const { API_URL, API_KEY, SECRET } = require('../config')

/**
 * Returns the sha256 HMAC hash for paramString & secret combo
 * @param {string} paramString - Query string of request parameters
 * @returns {string} sha256 HMAC signature hex string
 */
const getSignature = (paramString) => {
  let signature = crypto.createHmac('sha256', SECRET)
  if (paramString) {
    signature = signature.update(paramString)
  }
  signature = signature.digest('hex')

  return signature
}

/**
 * Returns object request headers
 * @returns {Object} Object with Content-Type & X-MBX-APIKEY headers.
 *  (can pass to axios options directly)
 */
const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-MBX-APIKEY': API_KEY
  }
  return headers
}

/**
 * Returns new listenKey
 * The lilistenKey is valid for 60 minutes unless a keepalive is sent.
 * @async
 */
const createListenKey = async () => {
  try {
    const url = `${API_URL}/v3/userDataStream`
    const headers = getHeaders()

    const response = await axios.post(url, '', { headers })

    return response.data
  } catch (error) {
    console.log('Error when creating listen key')
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

module.exports = { getSignature, getHeaders, createListenKey, getAccountInfo }
