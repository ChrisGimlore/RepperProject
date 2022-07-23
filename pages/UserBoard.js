import React, { useContext } from 'react'
import { RepperContext } from '../context/RepperContext'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import UserSellingCards from '../components/UserSellingCards'
import Image from 'next/image'
import UserSavedCards from '../components/UserSavedCards'


const UserBoard = () => {

    const {
        isAuthenticated,
        username,
        email,
        userAddress
      } = useContext(RepperContext)

    const styles = {
        container: `h-full w-full flex flex-col bg-[#fff]`,
        main: `h-full w-full flex flex-row mb-[50px]`,
        boardContainer:`h-full w-full flex flex-col justify-center items-center mt-[20px] p-10`,
        profilePicContainer: `flex flex-col h-full w-full justify-center items-center mb-5 mt-[20px]`,
        profilePic: ` p-10 h-full w-full rounded-full cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-xl shadow-xl border-[5px] border-black`,
        AddressContainer:`flex items-center justify-center w-[full] justify-center`,
        usernameContainer: `flex  rounded-xl items-center justify-center w-full h-full mb-5`,
        userEmail: `flex items-center justify-center w-[full] justify-center`,
        username: `flex items-center w-full justify-center`,
        emailText: `text-md mb-2 font-bold text-2xl text-black`,
        usernameText: `text-md mb-2 font-bold text-2xl text-black`,
        emailContainer: `flex  rounded-xl items-center justify-center w-full h-full mb-5`,
        picBox: `h-full w-full flex items-center justify-center`

      }

  return (
    <div className={styles.container}>
        <Header />
        <div className={styles.main}>
            <Sidebar/>
            {isAuthenticated ? (
            <>
            <div className={styles.boardContainer}>
                <div className={styles.profile}>
                    <div className={styles.profilePicContainer}>
                        <Image
                            src={`https://avatars.dicebear.com/api/pixel-art/${username}.svg`}
                            alt='profile'
                            className={styles.profilePic}
                            height={200}
                            width={200}
                        />
                    </div>
                    <div className={styles.usernameContainer}>
                        <div className={styles.usernameText}>{username}</div>
                    </div>
                    <div className={styles.emailContainer}>
                        <div className={styles.emailText}>{email}</div>
                    </div>
                    <div className={styles.emailContainer}>
                        <div className={styles.emailText}>{userAddress}</div>
                    </div>
                </div>
                <UserSavedCards/>
                <UserSellingCards/>
            </div>
            </> 
            ):(<div className={styles.loginMessage}>Please connect your wallet to view this page!</div>)} 
            
        </div>
    </div>
  )
}

export default UserBoard