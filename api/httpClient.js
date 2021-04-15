const axios = require('axios')
const { API_URL, API_KEY } = require('../config')

const AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-MBX-APIKEY': API_KEY
  }
})

module.exports = AxiosInstance
