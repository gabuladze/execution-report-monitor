
const axios = require('axios')

const { API_URL } = require('../config')
const { getHeaders } = require('./utils.js')

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

module.exports = { createListenKey }
