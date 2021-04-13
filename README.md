Small Node.js app for monitoring executionReport event time delay.

# Description
Write a small app that can monitor the `executionReport` websocket message delay for X ms. If your order is matched, there will be a message with event type `executionReport` gives many details. We want to have a small application that can alert us if the Event time is delivered delayed up to X ms.

[Testnet](https://testnet.binance.vision/) has the free funds to trade.

* X is configable, so I can set to 5000ms or 10000ms, etc.
* Should not use any pre-build library related to Binance or other crypto exchanges
* Language is not limited, but please give details of how to run.
* UI is not required, running from terminal is enough.

[Spot api docs](https://github.com/binance/binance-spot-api-docs)