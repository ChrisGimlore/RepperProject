import React, { useContext } from 'react'
import Image from 'next/image'
import { RepperContext } from '../context/RepperContext'
import { FaCoins } from 'react-icons/fa'
import { BsFillBookmarkFill } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import Link from 'next/link'



const Card = ({ item }) => { 

  const { gbp, buyAsset, saveItem } = useContext(RepperContext)

    const styles = {
        cardContainer: `flex flex-col flex-wrap justify-center items-center`,
        card: `h-[250px] w-[190px] rounded-3xl flex justify-center flex-col cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-xl overflow-hidden border border-black shadow-xl border-4 border-[#fb9701]`,
        cardTitle: `text-xl font-bold flex text-center w-full flex-1 flex-wrap justify-center mt-[10px]`,
        price: `text-md font-bold flex justify-center`,
        coins: `ml-[10px]`,
        imageOverlay:` opacity-0 hover:opacity-100 duration-300 fixed flex justify-evenly items-center text-6xl text-white font-semibold bg-black bg-opacity-25 h-[250px] w-[190px] overflow-hidden`,
        likeBtn: `br-[1px] b-white cursor-pointer transition-all duration-300  hover:scale-105 overflow-hidden`
    }
  const repGbp = ((gbp * 0.0001) * item.price).toFixed(2)
  return (
    <div className={styles.cardContainer}  >
        <div className={styles.card}>
            <Image
            src={item.productFilePath}
            className='object-cover object-center'
            width={190}
            height={250}
            alt= "product"
            />
            <div className={styles.imageOverlay}>
              <BsFillBookmarkFill className={styles.likeBtn} onClick={() => saveItem(item)}/>
              <Link href={{
                pathname: "/ProductPage",
                query: item, 
              }}>
                <FaEye className={styles.likeBtn}/>
              </Link>
            </div>
        </div>
        <div className={styles.cardTitle}>{item.name}</div>
        <div className={styles.price}>{item.price} RC <FaCoins className={styles.coins}/></div>
        <div className={styles.price}>£{repGbp}</div>
    </div>
  )
}

export default Card