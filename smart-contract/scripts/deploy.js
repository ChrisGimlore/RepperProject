const hre = require('hardhat')

async function main() {
  const repperCoinFactory = await hre.ethers.getContractFactory('RepperCoin')
  const repperCoin = await repperCoinFactory.deploy()

  await repperCoin.deployed()

  console.log('Repper Coin deployed to:', repperCoin.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })