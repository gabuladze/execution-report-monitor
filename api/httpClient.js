const axios = require('axios')
const { API_URL, API_KEY, SECRET } = require('../config')
const crypto = require('./crypto')
const querystring = require('querystring')

const AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-MBX-APIKEY': API_KEY
  }
})

const requestInterceptor = (config) => {
  if (config.secure) {
    const paramString = querystring.stringify(config.params)
    config.params.signature = crypto.getSignature(paramString, SECRET)
  }
  return config
}

AxiosInstance.interceptors.request.use(requestInterceptor)

module.exports = AxiosInstance
