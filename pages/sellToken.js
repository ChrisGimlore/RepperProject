import React, { useContext } from 'react'
import { SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import { RepperContext } from '../context/RepperContext';
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { FaExclamationCircle } from 'react-icons/fa'





const sellToken = () => {

  const styles = {
    container: `h-full w-full flex flex-col bg-[#fff]`,
    main: `h-full w-full flex flex-row mb-[50px]`,
    menuItem: `flex items-center text-md font-bold cursor-pointer mt-[30px] mb-[30px] text-3xl`,
    Uniswap: `w-full h-full flex flex-col justify-center items-center`,
    textContainer: `w-full flex flex-row items-center justify-start mb-[100px]`,
    text: `items-center text-md font-bold w-[60%] `,
    icon: `w-[5%] h-full flex text-5xl mr-[10px]`
  }
  
  const { walletProvider } = useContext(RepperContext)

  const infuraId = process.env.INFURA_ID;
  const JsonRpcEndpoint = `https://rinkeby.infura.io/v3/${infuraId}`


  return (
    <div className={styles.container}>
      <Header/>
      <div className={styles.main}>
         <Sidebar/>
        <>
        <div className={styles.Uniswap}>
          <div className={styles.menuItem}>Swap your Ethereum here!</div>
            <SwapWidget 
              width={500}
              height={700}
              provider={walletProvider}
              jsonRpcEndpoint={JsonRpcEndpoint} 
            />
          </div>
        </>
        <div className={styles.textContainer}>
          <FaExclamationCircle className={styles.icon}/>
          <a className={styles.text}>Due to a small liquidity pool, we are currently unable to provide an on-site Repper token swap. However, if you go on Uniswap home and place your unqiue wallet key into the swap widget you will be able to trade your tokens. Thank you for your understanding
          </a>
        </div>
      </div>
    </div>
  )
}

export default sellToken