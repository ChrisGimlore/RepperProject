import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { RepperContext } from '../context/RepperContext'
import Image from 'next/image'
import { useRouter } from "next/router";
import { BsFillBookmarkFill } from 'react-icons/bs';

const ProductPage = () => {

  const router = useRouter();
  const query = router.query;
  
  const { gbp, buyAsset, saveItem } = useContext(RepperContext)

    

    const styles = {
        container: `h-full w-full flex flex-col `,
        main: `h-full w-full flex flex-row mb-[50px]`,
        title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[30px]`,
        productContainer: `flex flex-row w-full h-full items-center mt-[30px] ml-[30px] justify-center `,
        image: `h-full w-full rounded-lg cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-xl overflow-hidden border-black border border-[#fb9701] flex items-center justify-center`,
        imageContainer: `border-none h-[700px] w-[500px] flex justify-center rounded-lg bg-slate-200`,
        itemInfo: `flex items-center justify-center w-full h-full `,
        text: `bg-transparent rounded-lg w-full py-2 px-4 text-3xl flex  text-black font-thin	`,
        productInfoContainer: `flex flex-col h-full ml-[50px] place-self-start gap-10`,
        itemDescription: `flex w-full bg-slate-200 rounded-xl`,
        textDescription: `bg-transparent rounded-lg w-full py-2 px-4 text-xl flex  text-black`,
        createItem: `justify-center items-center w-full text-md font-bold cursor-pointer h-[40px]  shadow-lg rounded-md bg-[#0d141c] border-[1px] border-white text-white place-self-center`,
        buttonContainer: `items-center justify-evenly flex mt-[20px] `,
        likeBtn: `ml-[10px] flex h-[40px] w-full b-white cursor-pointer transition-all duration-300  hover:scale-105 overflow-hidden`,
        sellOption: `flex border-1 w-full h-full  text-sm rounded-2xl text-white bg-gradient-to-t from-[#0d141c] to-[#42667e] justify-end items-end`

     }
     const repGbp = ((gbp * 0.0001) * query.price).toFixed(2)
  return (
    <div className={styles.container}>
        <Header/>
        <div className={styles.main}>
          <Sidebar />
          <div className={styles.productContainer}>
              <div className={styles.imageContainer}>
                          
                <div className={styles.image}>
                <Image
                width={500}
                height={700}
                src={query.productFilePath}
                className={styles.image}
                />
                </div>
                </div>
                <div className={styles.productInfoContainer}>

                  <div className={styles.itemInfo}>
                    <div className={styles.text}>
                      {query.name}
                    </div>
                  </div>

                  <div className={styles.itemInfo}>
                    <div className={styles.text}>
                      {query.price} RC
                    </div>
                    
                  </div>
                  <div className={styles.text}>
                    £{repGbp}
                  </div>

                  <div className={styles.sellOption}>
                    {query.sell_type}
                  </div>
                  
                  <div className={styles.itemDescription}>
                    <p className={styles.textDescription}>
                      {query.description}
                    </p>
                  </div>

                  <div className={styles.buttonContainer}> 
                    <button className={styles.createItem} onClick={buyAsset(query, query.price)}>Buy</button>
                    <BsFillBookmarkFill className={styles.likeBtn} onClick={() => saveItem(query)}/>
                  </div>

                </div>
          
            
        </div>
    </div>
  </div>
  )
}

export default ProductPage