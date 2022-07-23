import React, { useState, useContext } from 'react'
import { RepperContext } from '../context/RepperContext'
import BuyNotification from '../components/BuyNotification'
import { IoIosClose } from 'react-icons/io'

const BuyNotifications = ({close}) => {
    const {buyNotification} = useContext(RepperContext)
    console.log(buyNotification)

    const styles = {
        container: `h-full w-full flex flex-col ml-[20px] -mt-[50px] items-center`,
        title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[30px]`,
        cards: `flex items-center  flex-wrap gap-[80px]`,
        closeX: `w-full h-[50px] flex items-center justify-end mb-[20px]`
     }

  return (
    <div className={styles.container}>
        <div className={styles.title}>Notifcations</div>
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
            {buyNotification.map((notification) => {
               return <BuyNotification key={notification.id} notification = {notification.attributes} close={close}/>
            }
            )}
            
        </div>

    </div>
  )
}

export default BuyNotifications