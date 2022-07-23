import React, { useContext } from 'react'
import { RepperContext } from '../context/RepperContext'
import Card from './Card'

const UserSellingCards = () => {

    const {userProducts} = useContext(RepperContext)

    const styles = {
        container: `h-full w-full flex flex-col ml-[20px] mt-[50px]`,
        title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[30px]`,
        cards: `flex items-center flex-wrap gap-[80px] justify-evenly`,
     }

     console.log('user selling:', userProducts)

  return (
    <div className={styles.container}>
        <div className={styles.title}>Your store</div>
        <div className={styles.cards}>
            {userProducts.map((item) => {
               return <Card key={item.id} item = {item.attributes}/>
            }
            )}
            
        </div>

    </div>
  )
}

export default UserSellingCards