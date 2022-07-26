## Bundlr Service

A small service that check the balance of an account on the Bundlr network periodically and fund it if it is below a threshold.

## Running

Clone the repository and install the dependencies.

The service is configured using environment variables that you need to supply when you run `npm start`.

### Configuration

PRIVATE_KEY,
BUNDLR_URI,
BUNDLR_FEE_TOKEN,
ETH_URI,
INTERVAL = ONE_HOUR

- `PRIVATE_KEY`: The private key use to fund the bundlr account.
- `BUNDLR_URI`: The Bundlr node to connect ot.
- `BUNDLR_FEE_TOKEN`: The Bundlr currency to fund the account with.
- `ETH_URI`: The Ethereum node to connect ot.
- `INTERVAL`: The interval at which the service will check if it can update the oracle, and if so, do it. Defaults to 1 hour.
