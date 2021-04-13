require('dotenv').config()

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'dev',
  X: process.env.X || 3000,

  API_URL: process.env.API_URL || 'https://testnet.binance.vision/api',
  STREAM_WS_URL: process.env.STREAM_WS_URL || 'wss://testnet.binance.vision/stream',

  API_KEY: process.env.API_KEY,
  SECRET: process.env.SECRET
}
