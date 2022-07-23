import React from 'react'
import Image from 'next/image'


const BuyNotification = ({ notification }) => {

    const styles = {
        container: `h-full w-full flex flex-col`,
        cardContainer: `flex flex-col border-[1px] items-center rounded-md`,
        card: `h-[70px] w-[70px] rounded-3xl flex cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-xl overflow-hidden border border-black shadow-xl border-4 border-[#fb9701] items-center`,
        cardTitle: `text-xl font-bold flex text-center w-full flex-1 justify-center mt-[10px]`,
        price: `text-md font-bold flex justify-center`,
        closeX: `w-full h-[50px] flex items-center justify-end mb-[20px]`
    }

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer} >
        
            <div className={styles.card}>
                <Image
                src={notification.productFilePath}
                className='object-cover object-center'
                width={60}
                height={60}
                alt= "product"
                />
            </div>
            <div className={styles.cardTitle}>{notification.date}: Congratulations! your item has sold</div>
            <div className={styles.price}>{notification.name} has sold for {notification.price}RC! Please send your item to {notification.send_to}</div>
            <div className={styles.price}>Please email: {notification.buyerEmail} if you wish to contact the buyer</div>
            
      </div>
  </div>
  )
}

export default BuyNotification