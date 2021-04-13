const crypto = require('crypto')

const { API_KEY, SECRET } = require('../config')

/**
 * Returns the sha256 HMAC hash for paramString & secret combo
 * @param {string} paramString - Query string of request parameters
 * @returns {Object} containing signature param that is a string
 */
const getSignature = (paramString) => {
  let signature = crypto.createHmac('sha256', SECRET)
  if (paramString) {
    signature = signature.update(paramString)
  }
  signature = signature.digest('hex')

  return { signature }
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

module.exports = { getSignature, getHeaders }
