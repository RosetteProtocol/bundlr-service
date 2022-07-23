const BigNumber = require('bignumber.js')
const Bundlr = require('@bundlr-network/client')
const logger = require('./logger')

const ONE_HOUR = 60 * 60 * 1000

// Configuration
const {
  PRIVATE_KEY,
  BUNDLR_URI,
  BUNDLR_FEE_TOKEN,
  ETH_URI,
  INTERVAL = ONE_HOUR
} = process.env

if (!PRIVATE_KEY) {
  logger.error('Please set `PRIVATE_KEY`.')
  process.exit(1)
}

if (!BUNDLR_URI) {
  logger.error('Please set `BUNDLR_URI`.')
  process.exit(1)
}

if (!BUNDLR_FEE_TOKEN) {
  logger.error('Please set `BUNDLR_FEE_TOKEN`.')
  process.exit(1)
}

if (!INTERVAL) {
  logger.error('Please set `INTERVAL`.')
  process.exit(1)
}

// Set up bundlr
const bundlr = new Bundlr.default(BUNDLR_URI, BUNDLR_FEE_TOKEN, PRIVATE_KEY, {
  // for test networks
  providerUrl: ETH_URI ?? "",
});

// Run information
logger.info(`Acting as ${bundlr.address}`)
logger.info(`Connected to ${BUNDLR_URI}`)
logger.info(`Calling service every ${INTERVAL}ms`)

function parseInput (input) {
  return new BigNumber(input).multipliedBy(bundlr.currencyConfig.base[1])
}

async function callService () {
  logger.info('Checking wallet balance...')
  const balance = await bundlr.getLoadedBalance();

  logger.info(`Current balance is ${balance}`)
    
  // If balance is < 0.1
  if (balance.lt(parseInput("0.1"))) {
    // Fund your account with 0.25
    await bundlr.fund(parseInput("0.25"));
    logger.info(`Account succesfully funded.`)

    const balance = await bundlr.getLoadedBalance();
    logger.info(`Current balance is ${balance}`)
  }

  logger.info('Done calling service.')
}

async function main () {
  await callService()

  setTimeout(() => {
    main()
  }, INTERVAL)
}

main()
