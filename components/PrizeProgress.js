import React, { useContext, useState, useEffect } from 'react'
import { RepperContext } from '../context/RepperContext';
import ProgressBar from "@ramonak/react-progress-bar";



const PrizeProgress = () => {
    const [percentage, setPercentage] = useState()
    const [level, setLevel] = useState()
    const [levelBoundary, setLevelBoundary] = useState()

    const styles = {
        container: `h-full w-full flex bg-[#fff]`,
        main: `w-full h-full flex-col mt-[50px] justify-center items-center`,
        GaugeContainer: `w-full h-[60%] flex flex-col justify-center items-center`,
        GaugeMain: `flex flex-col w-full font bold text-2xl items-center mb-[20px]`,
        textContainer: `h-full flex flex-col justify-center items-center w-[60%]`,
        totalMessage: `text-lg font-bold mb-[20px] h-full`,
        mainTextContainer: `w-full h-full flex justify-center`,
        progress: `w-[60%] `,
      
      }

      useEffect(() => {
        calculatePrizeProgress(balance)
      }, [balance])


      const calculatePrizeProgress = (balance) => {

        if (balance < 1000) {
            const percent = (balance / 1000) * 100
            percent = percent.toFixed(0)
            setLevel(0)
            setPercentage(percent)
            setLevelBoundary(1000)
        }
        if (5000 > balance > 1000) {
            const percent = (balance / 5000) * 100
            percent = percent.toFixed(0)
            setLevel(1)
            setPercentage(percent)
            setLevelBoundary(5000)
        };

        if (10000 > balance > 5000) {
            const percent = (balance / 10000) * 100
            percent = percent.toFixed(0)
            setLevel(2)
            setPercentage(percent)
            setLevelBoundary(10000)
        };

        if (10000 < balance) {
            setPercentage(100)
            setLevel(3)
            setLevelBoundary('Verfified Repper')
        };
    };



      const { balance } = useContext(RepperContext)
     
  return (
    <div className={styles.container}>
      <div className={styles.main}>
            <div className={styles.GaugeContainer}>
                <div className={styles.GaugeMain}> 
                    Level: {level}
                    <div className={styles.GaugeMain}> {balance} RC / {levelBoundary} RC</div>
                     <ProgressBar className={styles.progress} completed={percentage} />
                </div>
            </div>
            <div className={styles.mainTextContainer}>
                <div className={styles.textContainer}>
                    <div className={styles.message}>
                    </div>
                    <div className={styles.message}>
                       
                    </div>
                    
                    <div className={styles.message}>
                       
                    </div>
                    <div className={styles.message}>
                
                    </div>
                    <div className={styles.message}>

                </div>
            </div>
      </div>
    </div>
    </div>
  )
}

export default PrizeProgress