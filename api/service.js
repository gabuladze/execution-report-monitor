const crypto = require('crypto')

class Service {
  constructor ({ HttpClient, apiKey, apiSecret }) {
    this.HttpClient = HttpClient
    this.apiKey = apiKey
    this.apiSecret = apiSecret
  }

  /**
   * Returns the sha256 HMAC hash for paramString & secret combo
   * @param {string} paramString - Query string of request parameters
   * @returns {string} sha256 HMAC signature hex string
   */
  getSignature (paramString) {
    let signature = crypto.createHmac('sha256', this.apiSecret)
    if (paramString) {
      signature = signature.update(paramString)
    }
    signature = signature.digest('hex')

    return signature
  }
}

module.exports = Service
