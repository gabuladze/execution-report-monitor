const crypto = require('crypto')

/**
 * Returns the sha256 HMAC hash for paramString & secret combo
 * @param {string} paramString - Query string of request parameters
 * @param {string} secret - Secret string used for generating the sha256 hmac
 * @returns {string} sha256 HMAC signature hex string
 */
const getSignature = (paramString, secret) => {
  let signature = crypto.createHmac('sha256', secret)
  if (paramString) {
    signature = signature.update(paramString)
  }
  signature = signature.digest('hex')

  return signature
}

module.exports = { getSignature }
