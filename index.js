const ws = require('./ws')

async function start () {
  try {
    console.log('Starting...')
    await ws.init()
  } catch (error) {
    console.log('An error has occured:', error.stack)
  }
}

start()
