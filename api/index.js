const crypto = require('crypto')

const { SECRET } = require('../config')

/**
 * Returns object request headers
 * @param {string} paramString - Query string of request parameters
 * @returns {Object} Object with Content-Type & X-MBX-APIKEY headers.
 *  (can pass to axios options directly)
 */
const getHeaders = (paramString) => {
  const signature = crypto.createHmac('sha512', SECRET).update(paramString).digest('hex')
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-MBX-APIKEY': signature
  }
  return headers
}

module.exports = { getHeaders }
