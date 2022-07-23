import React, { useContext } from 'react'
import { RepperContext } from '../context/RepperContext';
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import PrizeProgress from '../components/PrizeProgress';
import PrizeCards from '../components/PrizeCards';
import { HashLoader } from 'react-spinners'


const Prizes = () => {


    const styles = {
        container: `h-full w-full flex flex-col bg-[#fff]`,
        main: `h-full w-full flex flex-row mb-[50px]`,
        taxPage: `h-full w-full flex flex-col justify-center items-center mt-[20px]`,
        title: `text-2xl font-bold items-center`,
        loaderContainer: `w-full h-[500px] flex items-center justify-center`,
        loader: `w-full h-full flex items-center justify-center`,
      }

      const { isLoading } = useContext(RepperContext)
  return (
     <div className={styles.container}>
      <Header/> 
      <div className={styles.main}>
        <Sidebar/>
        {isLoading ? (
        <>
          <div className={styles.loaderContainer}>
            <HashLoader size={80} />
          </div>
        </>
        ):(
          <>
          <div className={styles.taxPage}>
            <div className={styles.title}>Monthly Prizes!</div>
                <PrizeProgress/>
                <PrizeCards/>
          </div>
          </>
        )}
        
      </div>
    </div>
  )
}

export default Prizes