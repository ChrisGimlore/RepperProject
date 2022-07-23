import React, { useContext } from 'react'
import { RepperContext } from '../context/RepperContext'
import { FaHeartBroken } from 'react-icons/fa'
import UserCard from './UserCard'


const UserSavedCards = () => {

    const { savedItems } = useContext(RepperContext)

    const styles = {
        container: `h-full w-full flex flex-col ml-[20px] mt-[50px] `,
        title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[30px]`,
        cards: `flex items-center flex-wrap gap-[80px] justify-evenly`,
     }
  return (
    <div className={styles.container}>
        <div className={styles.title}>Saved</div>

        {savedItems.length > 0 ? (
        <div className={styles.cards}>
            {savedItems.map((item, index) => {
               return <UserCard key={index} item = {item} index={index}/>
            }
            )}
            
        </div>
        ):(
            <div className={styles.NoSaved}>Nothing saved <FaHeartBroken/></div>
        )}
    </div>
  )
}

export default UserSavedCards