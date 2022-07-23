import React, { useContext, useState, useEffect } from 'react'
import { RepperContext } from '../context/RepperContext';
import GaugeChart from 'react-gauge-chart'

const TaxGauge = () => {

    const [gaugePercent, setGaugePercent] = useState()
    const [tax, setTax] = useState()
    const [gbpEarnings, setGbpEarnings] = useState()


    const styles = {
        container: `h-full w-full flex bg-[#fff]`,
        main: `w-full h-full flex-col mt-[50px] justify-center items-center`,
        GaugeContainer: `w-full h-[60%] flex flex-col justify-center items-center`,
        GaugeMain: `w-[60%]`,
        textContainer: `h-full flex flex-col justify-center items-center w-[60%]`,
        totalMessage: `text-lg font-bold mb-[20px] h-full`,
        mainTextContainer: `w-full h-full flex justify-center`
      }

    const { currentEarnings, gbp } = useContext(RepperContext)

    useEffect(() => {
        calculateTax()
      }, [currentEarnings])

    const calculateTax = () => {
        const earnings = (gbp * 0.0001) * currentEarnings
        earnings = earnings.toFixed(2)
        setGbpEarnings(earnings)

        if (earnings < 12300) {
            const percent = (earnings /50270)
            percent = percent.toFixed(2)
            setTax(0)
            setGaugePercent(percent)
        }
        if (earnings > 12300) {
            if (earnings < 50270 ) {
            const percent = (earnings /50270)
            percent = percent.toFixed(2)
            const tax = (earnings-12300) * 0.1
            tax = tax.toFixed(2)
            setTax(tax)
            setGaugePercent(percent)
        } else { 
            const percent = 1
            setGaugePercent(percent)
            const tax = ((earnings - 50270) * 0.2) + 3797
            tax = tax.toFixed(2)
            setTax(tax)
        };
        };
    };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
            <div className={styles.GaugeContainer}>
                <div className={styles.GaugeMain}>
                    <GaugeChart id="gauge-chart5"
                        hideText={true}
                        nrOfLevels={3}
                        arcsLength={[0.3, 0.5, 0.2]}
                        colors={['#5BE12C', '#F5CD19', '#EA4228']}
                        percent={gaugePercent}
                        arcPadding={0.02}
                    />
                </div>
            </div>
            <div className={styles.mainTextContainer}>
                <div className={styles.textContainer}>
                    <div className={styles.message}>
                        <a className={styles.totalMessage}> Total Earnings: £{gbpEarnings}
                        </a>
                    </div>
                    <div className={styles.message}>
                        <a className={styles.totalMessage}> {currentEarnings} Repper Coins
                        </a>
                    </div>
                    
                    <div className={styles.message}>
                        <a className={styles.taxMessage}> You will need to calculate your profits, which are Earnings minus Cost of sold assets.
                        As with all tax you pay on profits, you'll have to do a tax return to declare your income to HMRC.
                        </a>
                    </div>
                    <div className={styles.message}>
                        <a className={styles.totalMessage}> We estimate you could owe: £{tax} in tax. 
                        </a>
                    </div>
                    <div className={styles.message}>
                        <a className={styles.taxMessage}> In the UK, any payment you receive in tokens/ cryptocurrency for products and services is counted as taxable income, so you should report this on your tax return.
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default TaxGauge