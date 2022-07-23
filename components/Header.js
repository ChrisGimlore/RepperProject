import React, { useContext } from 'react'
import logo from '../assets/logo.jpg.png';
import Image from 'next/image'
import Link from 'next/link';
import { CgMenuGridO } from 'react-icons/cg'
import { IoMdSearch, IoIosAddCircleOutline } from 'react-icons/io'
import { FaCoins, FaExchangeAlt, FaEnvelope } from 'react-icons/fa'
import { RepperContext } from '../context/RepperContext';
import { ModalProvider, Modal, useModal, ModalTransition } from 'react-simple-hook-modal';
import 'react-simple-hook-modal/dist/styles.css'
import BuyModal from './BuyModal';
import BuyNotifications from './BuyNotifications';
import ExtrasModal from './ExtrasModal';
import { ConnectButton } from 'web3uikit';




const Header = () => {
    const styles = {
      container: `h-full w-full flex flex-row items-center gap-5 justify-evenly bg-gradient-to-t from-[#0d141c] to-[#42667e] border-b-[2px] border-b-[#fb9701]`,
      logo: `flex items-center h-full w-[200px] cursor-pointer border-b-5 cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-xl overflow-hidden `,
      search: `p-[25px] mr-[30px] w-[400px] h-[40px] bg-white rounded-full shadow-lg flex flex items-center border-none`,
      searchInput: `bg-transparent  items-center flex w-full border-none`,
      menu: `flex items-center gap-5 justify-evenly`,
      menuItem: `flex cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-xl overflow-hidden items-center text-md font-bold cursor-pointer text-white`,
      coins: `ml-[10px]`,
      buyBtn: `flex items-center p-[20px] mr-[20px] cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-xl overflow-hidden text-md font-bold cursor-pointer h-[40px] flex-1 flex shadow-lg rounded-md mt-[40px] mb-[45px] border-[1px] border-slate-500 text-white`,
      plus: `ml-[10px]`,
      profile: `flex flex-col pb-3 w-[300px] items-center `,
      profilePicContainer: `flex pb-3 rounded-xl items-center justify-center h-full `,
      profilePic: `rounded-3xl object-cover`,
      welcome: ` text-md mb-2 font-bold text-xl text-white`,
      walletAddress: `text-xl flex justify-center font-extrabold mb-4`,
      usernameInput: `bg-transparent border-white border-2 rounded-lg w-[80%] py-2 px-4 text-lg mt-[20px] placeholder:text-white focus:outline-none flex justify-center items-center text-white`,
      username: `flex items-center w-full justify-center`,
      setNickname: `text-lg font-bold flex flex-1 items-center mt-[20px] mb-[20px] text-white`,
    }
  
    const { 
      balance, 
      buyTokens, 
      isAuthenticated,
      nickname,
      setNickname,
      username,
      handleSetUsername,
    } = useContext(RepperContext)

    const { openModal, isModalOpen, closeModal } = useModal()
    const { openModal: notifOpenModal, isModalOpen: notifIsModalOpen, closeModal: notifCloseModal } = useModal()
    const { openModal: extrasOpenModal, isModalOpen: extrasIsModalOpen, closeModal: extrasCloseModal } = useModal()
    
    
    
    return (
      <ModalProvider>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link href='/'>
              <a>
              <Image
                src={logo}
                alt='Repper'
                height={100}
                width={100}
                className='object-cover'
              />
              </a>
            </Link>
            
          </div>
        <div className={styles.profile}>
        {isAuthenticated && (
          <>
            
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
            ) : (
              <div>
                <div className={styles.welcome}>Welcome {username}</div>
              </div>
            )}
          </>
        )}
        <div className={styles.connectButton}>
          <ConnectButton />
        </div>
      </div>
          
          <div className={styles.search}>
            <input
              type='text'
              placeholder='Search Your Assets...'
              className={styles.searchInput}
            />
            <IoMdSearch fontSize={20} />
          </div>
          <div className={styles.menu}>
            <Link href='/listItem'>
            <button className={styles.buyBtn}>Sell Item <IoIosAddCircleOutline className={styles.plus}/></button>
            </Link>

            <Link href='/sellToken'><button  className={styles.menuItem}>Token exchange <FaExchangeAlt className={styles.plus}/></button></Link>

            <div className={styles.menuItem}>New Releases</div>

            <div className={styles.menuItem} onClick={notifOpenModal}>
              <FaEnvelope className={styles.coins} />
              <Modal id='buynotification' isOpen={notifIsModalOpen} transition={ModalTransition.SCALE}>
              <BuyNotifications close={notifCloseModal}/>
              </Modal>
            </div>
            
            {balance ? (
              <div
                className={(styles.balance, styles.menuItem)}
                onClick={openModal}
              >
                {balance}
                <FaCoins className={styles.coins} />
                <Modal id='buytokens' isOpen={isModalOpen} transition={ModalTransition.SCALE}>
                  <BuyModal close={closeModal} buyTokens={buyTokens} />
                </Modal>
              </div>
              
            ) : (
              <div
                className={(styles.balance, styles.menuItem)}
                onClick={openModal}
              >
                0 RC <FaCoins className={styles.coins} />
                <Modal isOpen={isModalOpen} transition={ModalTransition.SCALE}>
                  <BuyModal close={closeModal} buyTokens={buyTokens} />
                </Modal>
              </div>
            )}
            
            <div className={styles.menuItem} onClick={extrasOpenModal}>
              <CgMenuGridO fontSize={30} className={styles.menuItem} />
              <Modal isOpen={extrasIsModalOpen} transition={ModalTransition.SCALE}>
                <ExtrasModal close={extrasCloseModal}/>
              </Modal>
            </div>

          </div>
        </div>
      </ModalProvider>
    )
  }

export default Header