// context/WalletContext.js
import React, { createContext, useContext, useState } from 'react';

const WalletContext = createContext(null);

export const WalletContextProvider = ({ children }) => {
    
    const [currentAccount, setCurrentAccount] = useState(null)

  const checkWalletIsConnected = async () => {
    const { ethereum } = window

    if (!ethereum) {
      console.log('Make sure you have Metamask installed!')
      return
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' })

    if (accounts.length !== 0) {
      const account = accounts[0]
      console.log('Found an authorized account: ', account)
      setCurrentAccount(account)
    } else {
      console.log('No authorized account found')
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window

    if (!ethereum) {
      alert('Please install Metamask!')
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log(accounts[0])
      console.log('Found an account! Address: ', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (err) {
      console.log(err)
    }
  }

  const connectWalletButton = () => {
    return (
      <button
        onClick={connectWalletHandler}
        // className="btn-primary w-40 rounded mt-10"
      >
        Connect Wallet
      </button>
    )
  }

  const WalletContextValue = {
    currentAccount,
    checkWalletIsConnected,
    connectWalletHandler,
    connectWalletButton
  }

  return (
    <WalletContext.Provider value={ WalletContextValue }>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
      throw new Error('useWallet must be used within a WalletContextProvider');
    }
    return context;
  };