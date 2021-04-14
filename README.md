Small Node.js app for monitoring executionReport event time delay.

# Problem Statement
Write a small app that can monitor the `executionReport` websocket message delay for X ms. If your order is matched, there will be a message with event type `executionReport` gives many details. We want to have a small application that can alert us if the Event time is delivered delayed up to X ms.

[Testnet](https://testnet.binance.vision/) has the free funds to trade.

* X is configable, so I can set to 5000ms or 10000ms, etc.
* Should not use any pre-build library related to Binance or other crypto exchanges
* Language is not limited, but please give details of how to run.
* UI is not required, running from terminal is enough.

[Spot api docs](https://github.com/binance/binance-spot-api-docs)

# Setup
## 1. Create .env file
Create the `.env` file. You can use the `.env.example` provided in the repo. Run: `cp .env.example .env` . **After this make sure to populate the env variables with correct values.**

| Parameter | Description | Default Value|
| --- | --- | --- |
| NODE_ENV | App Environment | Dev |
| X | Delay in milliseconds (mentioned in problem statement) | 5000 |
| API_URL | Base url for Binance API | https://testnet.binance.vision/api |
| STREAM_WS_URL | Base url for Binance stream ws server | wss://testnet.binance.vision/ws |
| API_KEY | Binance API key | |
| SECRET | Binance API secret | |


## 2. Start the app
Next step would be to run the app.  
Once started, the the app will generate `listenKey` and listen to incoming messages from Binance stream ws server.

### Start with docker-compose
Run `docker-compose up`. This will build the docker image, install dependencies & start the `execution-report-monitor` container. You will be presented the stdout of the container. To stop, press `Ctrl+C`.

### Start without docker-compose
The app was tested on Node.js v14.16.1 LTS, therefore I would suggest to use this version to avoid any bugs/anomalies.
To run the app:
1. Run `npm i` to install the dependencies
2. Run `npm start`

# Tests
I've included few simple unit tests in the tests directory. To run them run: `npm test` or if you docker-compose: `docker exec -it execution-report-monitor npm test`