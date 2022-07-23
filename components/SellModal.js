import React from 'react'
import { SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import { ethers } from 'ethers'



const SellModal = () => {
    const provider = ethers.getDefaultProvider('https://speedy-nodes-nyc.moralis.io/01cdcbe376e812355be7776e/eth/rinkeby'  )
    const styles = {
        container: `h-full w-full flex flex-col `,
        closeX: `w-full h-[50px] flex items-center justify-end mb-[20px]`,
        title: `text-3xl font-bold flex flex-1 items-center mt-[20px] justify-center mb-[40px]`,
        content: `flex w-full mb-[30px] text-xl justify-center`,
        input: `w-[50%] h-[50px] bg-[#f7f6f2] rounded-lg p-[10px] flex mx-auto`,
        inputBox: `w-full h-full flex items-center justify-center bg-[#f7f6f2] focus:outline-none`,
        price: `w-full h-full flex justify-center items-center mt-[20px] font-bold text-3xl`,
        buyBtn: `w-[20%] h-[50px] bg-[#000] mt-[40px] rounded-lg p-[10px] flex mx-auto text-white justify-center items-center cursor-pointer`,
        loaderContainer: `w-full h-[500px] flex items-center justify-center`,
        loader: `w-full h-full flex items-center justify-center`,
        etherscan: `w-full h-full flex items-center justify-center text-green-500 text-2xl mt-[20px] font-bold cursor-pointer`,
        success: `w-full h-full flex items-center justify-center text-xl mt-[20px] font-bolder`,
      }

      const jsonRpcEndpoint = 'https://mainnet.infura.io/v3/<YOUR_INFURA_PROJECT_ID>'
  return (
    <><div>Sell your tokens here!</div>
    <div className="Uniswap">
          <SwapWidget
              provider={provider}
              jsonRpcEndpoint={jsonRpcEndpoint} />
      </div></>
  )
}

export default SellModal