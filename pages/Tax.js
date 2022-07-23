import React from 'react'
import { RepperContext } from '../context/RepperContext';
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import TaxGauge from '../components/TaxGauge';


const Tax = () => {


    const styles = {
        container: `h-full w-full flex flex-col bg-[#fff]`,
        main: `h-full w-full flex flex-row mb-[50px]`,
        taxPage: `h-full w-full flex flex-col justify-center items-center mt-[20px]`,
        title: `text-2xl font-bold`
      }


  return (

    <div className={styles.container}>
      <Header/> 
      <div className={styles.main}>
        <Sidebar/>
        <>
        <div className={styles.taxPage}>
        <div className={styles.title}>Tax and Earnings</div>
            <TaxGauge/>
          </div>
        </>
      </div>
    </div>
    
  )
}

export default Tax