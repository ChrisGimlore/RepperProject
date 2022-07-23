require('@nomiclabs/hardhat-waffle')
require('dotenv').config({ path: '.env' })

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

module.exports = {
  solidity: '0.8.4',
  networks: {
    rinkeby: {
      url: 'https://speedy-nodes-nyc.moralis.io/01cdcbe376e812355be7776e/eth/rinkeby',
      accounts: ['92fa780b3c51914ad56a75e295f59d59f0d2c49fb798b7a9a81bdbee1aa8bf51'],
    },
  },
}