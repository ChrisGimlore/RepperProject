import { createContext, useState, useEffect } from 'react'
import { useMoralis, useMoralisQuery, useMoralisFile } from 'react-moralis'
import { RepperAbi, RepperCoinAddress } from '../lib/constants'
import { ethers } from 'ethers'
import axios from 'axios';

export const RepperContext = createContext()

export const RepperProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [formattedAccount, setFormattedAccount] = useState('')
  const [balance, setBalance] = useState('')
  const [tokenAmount, setTokenAmount] = useState('')
  const [amountDue, setAmountDue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [etherscanLink, setEtherscanLink] = useState('')
  const [nickname, setNickname] = useState('')
  const [username, setUsername] = useState('')
  const [assets, setAssets] = useState([])
  const [recentTransactions, setRecentTransactions] = useState([])
  const [ownedItems, setOwnedItems] = useState([])
  const [userEmail, setUserEmail] = useState('')
  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemFile, setItemFile] = useState('')
  const [itemPrice, setItemPrice] = useState('')
  const [email, setEmail] = useState('') 
  const [sellOptions, setSellOptions] = useState('') 
  const [address, setAddress] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [buyNotification, setBuyNotification] = useState([])
  const [walletProvider, setWalletProvider] = useState('')
  const [currentEarnings, setCurrentEarnings] = useState('')
  const [gbp, setGbp] = useState([]);
  const [userProducts, setUserProducts] = useState([])
  const [savedItems, setSavedItems] = useState([])
  const [itemVerificationPhoto, setItemVerificationPhoto] = useState('')
  const [approverStatus, setApproverStatus] = useState('')
  const [userPrizeLevel, setUserPrizeLevel] = useState('')

  let seller;
  let soldPrice;

  // var CronJob = require('cron').CronJob;

  // CronJob.schedule('0 0 1 * *', () => {
  //   userPrizes();
  // });
  
  const {
    authenticate,
    isAuthenticated,
    enableWeb3,
    Moralis,
    user,
    isWeb3Enabled,
    provider
  } = useMoralis()

  const {
    data: userData,
    error: userDataError,
    isLoading: userDataIsLoading,
  } = useMoralisQuery('_User')

  const {
    data: assetsData,
    error: assetsDataError,
    isLoading: assetsDataIsLoading,
  } = useMoralisQuery('products')

  const {
    data: buyNotificationData,
    error: buyNotificationDataError,
    isLoading: buyNotificationIsLoading,
  } = useMoralisQuery('buy_notification')

  useEffect(async () => {
    console.log(assetsData)
    await enableWeb3();
    await getAssets();
    await getOwnedAssets();
    await getSavedItems();
  
  }, [userData, assetsData, assetsDataIsLoading, userDataIsLoading, buyNotificationData, buyNotificationIsLoading])

  useEffect(async () => {
    
    if (!isWeb3Enabled) {
      await enableWeb3()
    }
    await listenToUpdates()
    
    setIsLoading(true)
    if (isAuthenticated) {
      console.log('is authenticated')
      await getBalance()

      const currentUsername = await user?.get('nickname')
      setUsername(currentUsername)

      const currentEmail = await user?.get('email')
      setEmail(currentEmail)

      const approverStatus = await user?.get('approver_state')
      setApproverStatus(approverStatus)

      const userPrizeLevel = await user?.get('prize_level')
      setUserPrizeLevel(userPrizeLevel)

      const currentAddress = await user?.get('address')
      setUserAddress(currentAddress)
      const earnings = await user?.get('rc_earned')
      setCurrentEarnings(earnings)

      const account = await user?.get('ethAddress')
      setCurrentAccount(account)

      setWalletProvider(provider)

      const formatAccount = account.slice(0, 5) + '...' + account.slice(-5)
      setFormattedAccount(formatAccount)
      await getUserProducts()
      await getBuyNotif()
      setIsLoading(false)
    } else {
      console.log('not authenticated')
      setCurrentAccount('')
      setFormattedAccount('')
      setBalance('')
    }
  }, [
    isWeb3Enabled,
    isAuthenticated,
    balance,
    setBalance,
    authenticate,
    currentAccount,
    setUsername,
    user,
    username,
    authenticate,
    provider,
  ])

  const connectWallet = async () => {
    await enableWeb3()
    await authenticate()
  }

  const buyTokens = async () => {
    if (!isAuthenticated) {
      await connectWallet()
    }

    const amount = ethers.BigNumber.from(tokenAmount)
    const price = ethers.BigNumber.from('100000000000000')
    const calcPrice = amount.mul(price)

    console.log(RepperCoinAddress)

    let options = {
      contractAddress: RepperCoinAddress,
      functionName: 'mint',
      abi: RepperAbi,
      msgValue: calcPrice,
      params: {
        amount,
      },
    }
    const transaction = await Moralis.executeFunction(options)
    const receipt = await transaction.wait()
    setIsLoading(false)
    console.log(receipt)
    setEtherscanLink(
      `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`,
    )
  }

  const handleSetAddress = () => {
    if (user) {
      if (address) {
        user.set('address', address)
        user.save()
        setAddress('')
        location.reload();

      } else {
        console.log("Can't set empty address")
      }
    } else {
      console.log('No user')
    }
  }

  const handleSetUserEmail = () => {
    if (user) {
      if (userEmail) {
        user.set('email', userEmail)
        user.save()
        setUserEmail('')
      } else {
        console.log("Can't set empty email")
      }
    } else {
      console.log('No user')
    }
  }
  const handleSetUsername = () => {
    if (user) {
      if (nickname) {
        user.set('nickname', nickname)
        user.save()
        setNickname('')
      } else {
        console.log("Can't set empty username")
      }
    } else {
      console.log('No user')
    }
  }

  const getBalance = async () => {
      try {
        if (!isAuthenticated || !currentAccount) return
        const options = {
          contractAddress: RepperCoinAddress,
          functionName: 'balanceOf',
          abi: RepperAbi,
          params: {
            account: currentAccount,
          },
        }

        if (isWeb3Enabled) {
          const response = await Moralis.executeFunction(options)
          console.log('balance', response.toString())
          setBalance(response.toString())


         
        }
      } catch (error) {
        console.log(error)
      }
    }

  const saveItem = async(product) => {
    try {
      if (user) {
        const likes = userData[0].add('savedItems', {
          ...product
        })
        await likes.save().then(() => {
          alert("save successful!")
        })
      }
    } catch (error) {
      console.log(error.message)
    }
  } 

  const buyAsset = async (price, asset) => {
    try {
      if (!isAuthenticated) return
      console.log('price: ', price)
      console.log('asset: ', asset.name)
      console.log(userData)

      const options = {
        type: 'erc20',
        amount: price,
        receiver: asset.Seller,
        contractAddress: RepperCoinAddress,
      }

      let transaction = await Moralis.transfer(options)
      const receipt = await transaction.wait()

      if (receipt) {

        const res = userData[0].add('ownedAsset', {
          ...asset,
          purchaseDate: Date.now(),
          etherscanLink: `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`,
        })

        await res.save().then(() => {
          alert("Purchase successful!")
        })  
        
        seller = asset.Seller
        soldPrice = price

        await earningUpdate(seller, soldPrice)

        const buyNotification = Moralis.Object.extend("buy_notification");
        const buyNotif = new buyNotification();

        buyNotif.set('buyer', currentAccount)
        buyNotif.set('seller', asset.Seller)
        buyNotif.set('price', price)
        buyNotif.set('name', asset.name)
        buyNotif.set('date', Date.now())
        buyNotif.set('send_to', userAddress)
        buyNotif.set('productFilePath', asset.productFilePath)
        buyNotif.set('buyerEmail', email)
        
        await buyNotif.save();


      }
    } catch (error) {
      console.log(error.message)
    }
  }


  const itemVerificationRequest = async () => {

    if (user){
      if(!itemVerificationPhoto){
        alert('No verification photo!')
        return;
      }else if (itemName.length == 0){
        alert('Please give the item a name')
        return;
    }

    const productFile = new Moralis.File(itemFile.itemName, itemFile);
      await productFile.saveIPFS();
      const sellerEmail = email
      const productFilePath = productFile.ipfs();
      const productFileHash = productFile.hash();
      
        
        const itemVerificationRequest = Moralis.Object.extend("item_verification_requests");

      // Create a new instance of that class.
      const itemRequest = new itemVerificationRequest();
      itemRequest.set('sellerEmail', sellerEmail)
      itemRequest.set('name', itemName)
      itemRequest.set('price', itemPrice)
      itemRequest.set('sell type', sellOptions)
      itemRequest.set('description', itemDescription);
      itemRequest.set('productFilePath', productFilePath);
      itemRequest.set('productFileHash', productFileHash);
      itemRequest.set('Seller', currentAccount)
      itemRequest.set('VerificationPhoto', itemVerificationPhoto)

      await itemRequest.save();
      console.log(itemRequest);

      
      alert('Request sent!')
      
      window.location.replace('/')}
  }

  const createItem = async () => {
    if (user)
      {if (!itemFile){
          alert('please select file')
          return;
      }else if (itemName.length == 0){
          alert('Please give the item a name')
          return;
      }

      
      const productFile = new Moralis.File(itemFile.itemName, itemFile);
      await productFile.saveIPFS();
      const sellerEmail = email
      const productFilePath = productFile.ipfs();
      const productFileHash = productFile.hash();
      
      
      const metadata = {
          name: itemName.value,
          description: itemDescription.value,
          productFilePath: productFilePath,
          productFileHash: productFileHash,
      }

        
        
        const Product = Moralis.Object.extend("products");

        const Listres = userData[0].add('ListedItems', {
          productFileHash: productFileHash
        })

        await Listres.save()

      // Create a new instance of that class.
      const item = new Product();
      item.set('sellerEmail', sellerEmail)
      item.set('name', itemName)
      item.set('price', itemPrice)
      item.set('sell_type', sellOptions)
      item.set('description', itemDescription);
      item.set('productFilePath', productFilePath);
      item.set('productFileHash', productFileHash);
      item.set('Seller', currentAccount)

      await item.save();
      console.log(item);

      
      alert('Listing successful')
      
      window.location.replace('/')}
};

  const getAssets = async () => {
    try {
       enableWeb3()
        const query = new Moralis.Query('products')
        const results = await query.find()

        setAssets(assetsData)
    } catch (error) {
      console.log(error)
    }
  }

  const listenToUpdates = async () => {
    let query = new Moralis.Query('EthTransactions')
    let subscription = await query.subscribe()
    subscription.on('update', async object => {
      console.log('New Transactions')
      console.log(object)
      setRecentTransactions([object])
    })
  }

  const getOwnedAssets = async () => {
    try {

      if (userData[0]) {
        setOwnedItems(prevItems => [
          ...prevItems,
          userData[0].attributes.ownedAsset,
        ])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getSavedItems = async () => {
    try {

      if (userData[0]) {
        setSavedItems(prevItems => [
          ...prevItems,
          userData[0].attributes.savedItems,
        ])
      }
    } catch (error) {
      console.log(error)
    }
  }


  const getBuyNotif = async () => {

    try {
      if (buyNotificationData){
        const query = new Moralis.Query('buy_notification');
        query.equalTo("seller", currentAccount);
        const results = await query.find();
        setBuyNotification(results)
    }}
    catch (error) {
      console.log(error)
    } 
  }

  const earningUpdate = async (seller, soldPrice) => {
     
      const query = new Moralis.Query('_User');
      query.equalTo("ethAddress", seller);
      const results = await query.first();
      const amount = parseInt(soldPrice);
    
      results.increment("rc_earned", amount)
      await results.save()
  };


  const getUserProducts = async () => {
    try {

      if (userData[0]) {
        const query = new Moralis.Query('products');
        query.equalTo("Seller", currentAccount);
        const results = await query.find();
        setUserProducts(results)
        console.log(results)
      }
    } catch (error) {
      console.log(error)
    }
  }

  
  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=gbp'
      )
      .then(res => {
        setGbp(res.data.ethereum.gbp)
        
      })
      .catch(error => console.log(error));
  }, []);

  const RepBoostPrize = async () => {
    if (!user) {
      alert('Connect to claim your prizes')
      return
    }
    if (userPrizeLevel = 1){
     const RepBoost =  userData[0].increment('Reputation', 30)
     await RepBoost.save()
     const clearPrizeLevel = userData[0].set('price_level', 0)
     await clearPrizeLevel.save()

    }
    if (userPrizeLevel = 2){
      const RepBoost =  userData[0].increment('Reputation', 100)
      await RepBoost.save()
      const clearPrizeLevel = userData[0].set('price_level', 0)
      await clearPrizeLevel.save()
     }

  }

  const FreeItemAuthicationPrize = async () => {
    if (!user) {
      alert('Connect to claim your prizes')
      return
    }
    if (userPrizeLevel = 1){
     const ItemAuthicatorBoost =  userData[0].increment('free_item_authenticator', 1)
     await ItemAuthicatorBoost.save()
     const clearPrizeLevel = userData[0].set('price_level', 0)
     await clearPrizeLevel.save()

    }
    if (userPrizeLevel = 2){
      const ItemAuthicatorBoost =  userData[0].increment('free_item_authenticator', 3)
      await ItemAuthicatorBoost.save()
      const clearPrizeLevel = userData[0].set('price_level', 0)
      await clearPrizeLevel.save()
     }

  }


  const userPrizes = async () => {
    if (user[0]) {

      if (5000 > balance > 1000){
        prizeLevel = userData[0].set('prize_level', 1)
        await prizeLevel.save()
      }
      if (4999 < balance < 10000) {
        prizeLevel = userData[0].set('prize_level', 2)
        await prizeLevel.save()
        
      }

      if (balance > 9999) {
        prizeLevel = userData[0].set('prize_level', 3)
        await prizeLevel.save()
        
      }
    }
  }

  


  return (
    <RepperContext.Provider
      value={{
        formattedAccount,
        isAuthenticated,
        buyTokens,
        getBalance,
        balance,
        setTokenAmount,
        tokenAmount,
        amountDue,
        setAmountDue,
        isLoading,
        setIsLoading,
        setEtherscanLink,
        etherscanLink,
        buyAsset,
        currentAccount,
        nickname,
        setNickname,
        username,
        setUsername,
        handleSetUsername,
        assets,
        recentTransactions,
        ownedItems,
        handleSetUserEmail,
        userEmail,
        setUserEmail,
        createItem,
        setItemFile,
        setItemName,
        setItemDescription,
        setItemPrice,
        email,
        setSellOptions,
        userAddress,
        handleSetAddress,
        setAddress,
        buyNotification,
        itemFile,
        gbp,
        itemPrice,
        walletProvider,
        currentEarnings,
        userProducts,
        saveItem,
        savedItems,
        approverStatus,
        setItemVerificationPhoto,
        itemVerificationRequest,
        userPrizeLevel,
        RepBoostPrize,
        FreeItemAuthicationPrize
      }}
    >
      {children}
    </RepperContext.Provider>
  )
}