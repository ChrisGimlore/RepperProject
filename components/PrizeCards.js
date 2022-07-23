import React, { useContext } from 'react'
import { FaGift, FaRegCheckCircle, FaBolt, FaAward, FaHeartBroken, FaTruck } from 'react-icons/fa'
import { RepperContext } from '../context/RepperContext';

const PrizeCards = () => {

    const { userPrizeLevel, user, RepBoostPrize, FreeItemAuthicationPrize } = useContext(RepperContext)

    const styles = {
        container: `h-full w-full flex bg-[#fff] items-center justify-center pt-[50px]`,
        main: `w-[900px] h-full flex flex-col pt-[50px] justify-center items-center border-[1px] rounded-xl bg-gradient-to-t from-[#0d141c] to-[#42667e]`,
        IconContainer: `justify-evenly h-full w-full flex items-center`,
        prizeIcon: `h-[150px] w-[200px] m-2 rounded-xl flex flex-col items-center bg-white cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-xl overflow-hidden border-none shadow-xl border-4 border-[#94a3b8] justify-center`,
        icon: `h-[65%] w-[70%] flex cursor-pointer text-[#fb9701]`,
        prizeContainer: `w-[60%] mb-[20px] h-full flex rounded-xl bg-[#e2e8f0] justify-center items-center`,
        pagetitle: `w-full font-bold text-lg mb-[50px] flex justify-center mt-[10px] text-white`,
        titleContainer: `flex w-full items-center justify-center`,
        itemTitle: `text-xs text-[#94a3b8] font-bold w-[90%] justify-center items-center  mt-[5px] text-center`,
      }

  return (
    <div className={styles.container}>
        <div className={styles.main}>
            <div className={styles.titleContainer}>
                <div className={styles.pagetitle}>Choose your reward!</div>
            </div>
            {userPrizeLevel  ? (
                <>
                <div className={styles.prizeContainer}>
                    {userPrizeLevel == 1 ? (
                        <>
                        <div className={styles.IconContainer}>
                            <div onClick={FreeItemAuthicationPrize()} className={styles.prizeIcon}>
                                <FaAward className={styles.icon}/>
                                <a className={styles.itemTitle}>One free item authentication</a>
                            </div>
                            <div onClick={RepBoostPrize()} className={styles.prizeIcon}>
                                <FaBolt  className={styles.icon}/>
                                <a className={styles.itemTitle}>+30 Reputation Boost</a>
                            </div>
                        </div>
                        </>
                    ):(
                    <>
                    {userPrizeLevel == 2 ? (
                        <>
                        <div className={styles.IconContainer}>
                            <div className={styles.prizeIcon}>
                                <FaAward onClick={FreeItemAuthicationPrize()} className={styles.icon}/>
                                <a className={styles.itemTitle}>Three free item authenications</a>
                            </div>
                            <div className={styles.prizeIcon}>
                                <FaBolt onClick={RepBoostPrize()} className={styles.icon}/>
                                <a className={styles.itemTitle}>+100 Reputation Boost</a>
                            </div>
                        </div>
                        </>
                    ):(
                    <>
                    {userPrizeLevel == 3 ? (
                        <>
                        <div className={styles.IconContainer}>
                            <div className={styles.prizeIcon}>
                                <FaRegCheckCircle className={styles.icon}/>
                                <a className={styles.itemTitle}>Become a verified seller!</a>
                            </div>
                            <div className={styles.prizeIcon}>
                                <FaTruck className={styles.icon}/>
                                <a className={styles.itemTitle}>Free Shipping!</a>
                            </div>
                            <div className={styles.prizeIcon}>
                                <FaAward className={styles.icon}/>
                                <a className={styles.itemTitle}>Have your products featured!</a>
                            </div>
                        </div>
                        </>
                    ):(
                    <>
                    <div>Sorry! You don't hold enough Repper Coin for prizes <FaHeartBroken/></div>
                    </>)}
                    </>)}
                    </>)} 
                  </div>          
                </>
            ):(
                <>
                <div>You have no prizes to redeem <FaHeartBroken/> Prizes are awarded to those who hold Repper Coins!</div>
                
                </>
            )}
        </div>
    </div>

  )
}

export default PrizeCards