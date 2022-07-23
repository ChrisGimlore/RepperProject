import React, { useState, useContext } from 'react'
import { IoIosClose } from 'react-icons/io'
import { FaChartLine, FaGift } from 'react-icons/fa'
import Link from 'next/link';

const ExtrasModal = ({close}) => {

    const styles = {
        container: `h-full w-full flex flex-col items-center`,
        title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[30px]`,
        cards: `flex items-center h-full w-full  flex-wrap grid-cols-{3} bg-[#e2e8f0] rounded-xl `,
        closeX: `w-full h-[50px] flex items-center justify-end mb-[20px]`,
        menuIcon: `h-[120px] w-[120px] m-2 rounded-xl flex flex-col items-center bg-white cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-xl overflow-hidden border-none shadow-xl border-4 border-[#94a3b8] justify-center`,
        menuItem: `h-[70%] w-[70%] flex cursor-pointer`,
        IconContainer: `grid-cols-{3} h-full w-full flex items-center`,
        itemTitle: `text-xs color-[#94a3b8] font-bold w-[90%] justify-center items-center pl-[7px]`,
        smallItemTitle: `text-xs color-[#94a3b8] font-bold w-[90%] justify-center items-center pl-[10px]`
     }

  return (
    <div className={styles.container}>
        <div className={styles.title}>Menu</div>
        <div className={styles.closeX}>
            <IoIosClose
            onClick={() => {
            close()
            }}
            fontSize={50}
            className='cursor-pointer'
            />
        </div>
        <div className={styles.cards}>
            <div className={styles.IconContainer}>
                <Link href='/Tax'>
                    <div className={styles.menuIcon}>
                        <FaChartLine className={styles.menuItem}/>
                        <a className={styles.itemTitle}>Tax and earnings</a>
                    </div>
                </Link>
                <Link href='/Prizes'>
                    <div className={styles.menuIcon}>
                        <FaGift className={styles.menuItem}/>
                        <a className={styles.smallItemTitle}>Monthly Prizes</a>
                    </div>
                </Link>
            </div>
        </div>

    </div>
  )
}

export default ExtrasModal