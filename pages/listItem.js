import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { RepperContext } from '../context/RepperContext'
import Select from 'react-select';
import Image from 'next/image'
import logo from '../assets/logo.jpg.png';
import Header from '../components/Header';






const listItem = () => {


  
  const [preview, setPreview] = useState();
  const [priceGbp, setPriceGbp] = useState();


  const selloptions = [
    { label: "Selling", value: 1 },
    { label: "Open to offers", value: 2 },
  ];


    const {
        isAuthenticated,
        setItemPrice,
        createItem,
        setItemFile,
        setItemName,
        setItemDescription,
        setSellOptions,
        itemFile,
        itemPrice,
        gbp,
        setItemVerificationPhoto,
        itemVerificationRequest,
      } = useContext(RepperContext)

      useEffect(() => {
        if (itemFile) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result)
          }
          reader.readAsDataURL(itemFile)
        } else {
          setPreview(logo)
        }
      })

      useEffect(() => {
        calculatePrice()
      }, [itemPrice])
    
      const calculatePrice = () => {
        const gbpPrice = parseFloat(((gbp * 0.0001) * itemPrice))
        gbpPrice = gbpPrice.toFixed(2)
        setPriceGbp(gbpPrice)
      }

    const styles = {
        container: `h-full w-full flex flex-col bg-[#fff]`,
        main: `h-full w-full flex flex-row mb-[50px]`,
        loginMessage:`flex items-center text-lg font-bold cursor-pointer gap-2`,
        itemName: `flex items-center justify-center w-[full] justify-center`,
        itemNameInput: `bg-transparent border-black border-2 rounded-lg w-[80%] py-2 px-4 text-lg mt-[20px] placeholder:text-black focus:outline-none flex justify-center items-center text-black`,
        itemDescription: `flex items-center justify-center w-[full] justify-center mb-[20px] mt-[20px] h-[100px]`,
        itemDescriptionInput: `h-full py-1 bg-transparent border-black border-2 rounded-lg w-[80%] py-2 px-4 text-lg placeholder:text-black focus:outline-none flex flex-wrap  text-black`,
        itemFile: `flex items-center justify-center w-[full] justify-center`,
        itemFileInput: `bg-transparent border-white border-2 rounded-lg w-[60%] py-2 px-4 text-lg mt-[20px] placeholder:text-black focus:outline-none flex justify-center items-center text-black`,
        createItem: `justify-center items-center w-[40%] text-md font-bold cursor-pointer h-[40px]  shadow-lg rounded-md bg-[#0d141c] border-[1px] border-white text-white`,
        statusContainer:`flex items-center justify-center w-[full] justify-center`,
        image: `h-full w-full rounded-lg cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-xl overflow-hidden border-black border-4 border-[#fb9701] flex items-center justify-center`,
        inputContainer: `items-center w-[500px] h-[700px] flex-col justify-evenly`,
        imageContainer: `border-none h-[700px] w-[500px] flex justify-center rounded-lg bg-slate-200`,
        itemContainer: `flex flex-row `,
        buttonContainer: `items-center justify-center flex mt-[20px]`,
        price: `w-[80%] justify-end flex items-center mt-[10px] font-bold text-xl`,
        sellContainer: `flex flex-col w-full h-full justify-center items-center mt-[80px]`
    }

  return (
    <div className={styles.container}>
       <Header/>
       <div className={styles.main}>
        <Sidebar />
        <div className={styles.sellContainer}>
        {!isAuthenticated ? (
            <>
              <div className={styles.loginMessage}>You need to login before you can list an item!</div>
                </>
                ):(
                                
                <>
                <div className={styles.itemContainer}>
                  <div className={styles.imageContainer}>
                    {!itemFile ? (
                      <>
                    <div className={styles.image}>
                    <Image
                    width={250}
                    height={250}
                    className={styles.image}
                    src={logo}
                    />
                    </div>
                    </>
                    ):(
                      <>
                      <div className={styles.image}>
                      <Image
                      width={250}
                      height={250}
                      className={styles.image}
                      src={preview}
                      />
                      </div>
                      </>
                    )}
                  </div>
                  <div className={styles.inputContainer}>
                    <div className={styles.itemName}>
                      <input
                        type='text'
                        placeholder='Item Name'
                        className={styles.itemNameInput}

                        onChange={e => setItemName(e.target.value)} />
                    </div>

                    <div className={styles.itemName}>
                      <input
                        type='text'
                        placeholder='Item Price'
                        className={styles.itemNameInput}
                        value={itemPrice}
                        onChange={e => setItemPrice(e.target.value)} />
                    </div>
                    <div className={styles.price}>
                        ≈ {' '}
                      {itemPrice && itemPrice > 0 ? '£'+priceGbp  : '£0'}
                    </div>

                    <div className={styles.itemDescription}>
                      <textarea
                        type='text'
                        placeholder='Item Description'
                        className={styles.itemDescriptionInput}

                        onChange={e => setItemDescription(e.target.value)} />
                    </div>

                    <div className={styles.statusContainer}>
                      <div>
                          <Select onChange={e => setSellOptions(e.label)} options={selloptions} />
                      </div>
                    </div>

                    <div className={styles.itemFile}>
                      <input
                        type='file'
                        className={styles.itemFileInput}

                        onChange={e => setItemFile(e.target.files[0])} />
                    </div>
                    <div className={styles.buttonContainer}> 
                    <button className={styles.createItem} onClick={createItem}>List item</button>
                    </div>
                  </div>
                </div>
                </>
              )}
          </div>
       </div>
    </div>
  )
}

export default listItem