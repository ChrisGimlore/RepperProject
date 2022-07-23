import React, { useContext } from 'react'
import { RepperContext } from '../context/RepperContext'
import Card from '../components/Card'

const Cards = () => {

    const {assets} = useContext(RepperContext)

    const styles = {
        container: `h-full w-[90%] flex flex-col ml-[10px] -mt-[50px]`,
        title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[30px]`,
        cards: `flex items-center flex-wrap gap-[80px] justify-evenly`,
     }
  return (
    <div className={styles.container}>
        <div className={styles.title}>New Releases</div>
        <div className={styles.cards}>
            {assets.map((item) => {
               return <Card key={item.id} item = {item.attributes}/>
            }
            )}
            
        </div>

    </div>
  )
}

export default Cards