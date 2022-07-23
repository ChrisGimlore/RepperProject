import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { RepperContext } from '../context/RepperContext'
import Image from 'next/image'




const profile = () => {

    const {
    isAuthenticated,
    nickname,
    setNickname,
    username,
    handleSetUsername,
    handleSetUserEmail,
    userEmail,
    setUserEmail,
    email,
    address,
    handleSetAddress,
    setAddress,
    userAddress
  } = useContext(RepperContext)

    const styles = {
        container: `h-full w-full flex flex-col bg-[#fff]`,
        main: `h-full w-full flex flex-row mb-[50px]`,
        tableContainer: `w-full h-full flex flex-col p-[100px] justify-center`,
        pageTitle: `text-2xl font-bold text-left mt-[50px] mb-[30px]`,
        transactions: `flex gap-[50px] flex-row flex-wrap`,
        profilePicContainer: `flex  rounded-xl items-center justify-center w-full h-full mb-5 mt-[50px]`,
        profilePic: `rounded-3xl object-cover border-black border-2`,
        usernameInput: `bg-transparent border-white border-2 rounded-lg w-[80%] py-2 px-4 text-lg mt-[20px] placeholder:text-white focus:outline-none flex justify-center items-center text-white`,
        username: `flex items-center w-full justify-center`,
        setNickname: `text-lg font-bold flex flex-1 items-center mt-[20px] mb-[20px] text-white`,
        usernameText: `text-md mb-2 font-bold text-2xl text-black`,
        usernameContainer: `flex  rounded-xl items-center justify-center w-full h-full mb-5`,
        userEmail: `flex items-center justify-center w-[full] justify-center`,
        emailInput: `bg-[#e8edea] border-white border-2 rounded-lg w-[30%] py-2 px-4 text-lg mt-[20px] placeholder:text-black focus:outline-none flex justify-center items-center text-black`,
        setEmail: `text-lg font-bold justify-center items-center rounded-3xl w-[30%] bg-gradient-to-t from-[#0d141c] to-[#42667e] mt-[40px] mb-[50px] border-2 border-[#fb9701] text-white`,
        emailContainer: `flex  rounded-xl items-center justify-center w-full h-full mb-5`,
        emailText: `text-md mb-2 font-bold text-2xl text-black`,
        setEmailContainer: `flex items-center justify-center w-[full] justify-center`,
        setAddressContainer: `flex items-center justify-center w-[full] justify-center`,
        setAddress: `flex items-center justify-center w-[full] justify-center`,
        AddressContainer:`flex items-center justify-center w-[full] justify-center`,
        addressInput: `bg-[#e8edea] border-white border-2 rounded-lg w-[30%] py-2 px-4 text-lg mt-[20px] placeholder:text-black focus:outline-none flex justify-center items-center text-black`,
        profilePage: `flex flex-col items-center justify-center w-full`
      }
  return (
    <div className={styles.container}>
       <Header/>
       <div className={styles.main}>
        <Sidebar />
        <div className={styles.profilePage}>
        {isAuthenticated && (
            <>
            <div className={styles.profilePicContainer}>
                    <Image
                        src={`https://avatars.dicebear.com/api/pixel-art/${username}.svg`}
                        alt='profile'
                        className={styles.profilePic}
                        height={100}
                        width={100}
                    />
                </div>
                {!username ? (
                    <>
                        <div className={styles.username}>
                        <input
                            type='text'
                            placeholder='Username....'
                            className={styles.usernameInput}
                            value={nickname}
                            onChange={e => setNickname(e.target.value)}
                        />
                        </div>
                        <button
                        className={styles.setNickname}
                        onClick={handleSetUsername}
                        >
                        Set Nickname
                        </button>
                        </>
                        ):(<div className={styles.usernameContainer}>
                            <div className={styles.usernameText}>Username: {username}</div>
                          </div>
                        )}
              {!email ? (
              <>
                <div className={styles.userEmail}>
                <input
                    type='text'
                    placeholder='Email address....'
                    className={styles.emailInput}
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                />
                </div>
                <div className={styles.setEmailContainer}>
                <button
                className={styles.setEmail}
                onClick={handleSetUserEmail}
                >
                Set Email
                </button></div>
                </>
                ):(<div className={styles.emailContainer}>
                    <div className={styles.emailText}>Email: {email}</div>
                  </div>
              )}
              {!userAddress ? (
              <>
                <div className={styles.userEmail}>
                <input
                    type='text'
                    placeholder='house/ flat number, street name, town/ city, postcode'
                    className={styles.emailInput}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                </div>
                <div className={styles.setEmailContainer}>
                <button
                className={styles.setEmail}
                onClick={handleSetAddress}
                >
                Set address
                </button></div>
                </>
                ):(<div className={styles.emailContainer}>
                    <div className={styles.emailText}>Address: {userAddress}</div>
                  </div>
              )}
          </>
                )}
          </div>      
      </div>
    </div>
  )
}

export default profile