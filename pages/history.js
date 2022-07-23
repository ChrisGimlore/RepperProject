import React, { useContext, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { RepperContext } from '../context/RepperContext'

import Transaction from '../components/Transaction'

const history = () => {
  const styles = {
    container: `h-full w-full flex flex-col bg-[#fff]`,
        main: `h-full w-full flex flex-row mb-[50px]`,
    tableContainer: `w-full h-full flex flex-col p-[100px] justify-center`,
    pageTitle: `text-2xl font-bold text-left mt-[30px] mb-[30px]`,
    transactions: `flex gap-[50px] flex-row flex-wrap`,
  }
  const { ownedItems } = useContext(RepperContext)
  return (
    <div className={styles.container}>
     <Header />

      <div className={styles.main}>
         <Sidebar />
        <div className={styles.tableContainer}>
          {ownedItems ? (
            <div className={styles.pageTitle}>Purchase History</div>
          ) : (
            <div className={styles.pageTitle}>No Purchase History</div>
          )}
          <div className={styles.transactions}>
            {ownedItems.map((item, index) => {
              return <Transaction key={index} item={item} index={index} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default history