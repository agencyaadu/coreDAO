import "./App.css";
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Reward } from "./pages/shop/Reward";
import { Contact } from "./pages/contact";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";
import { ethers } from 'ethers'
import Water from './contract/Water.json'
import TPurchase from './contract/TPurchase.json'

const waterContractAddress = '0x3c81c82655e98ae183a1d2fc4c038be15d2a252f'
const waterABI = Water

function App() {

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
      localStorage.setItem('userWalletAddress', account)
      console.log("Test:"+localStorage.getItem('userWalletAddress'))
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

  const showShop = () => {
    return (
      <div className="App">
        <ShopContextProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/reward" element ={<Reward/>}/>
            </Routes>
          </Router>
        </ShopContextProvider>
      </div>
    )
  }

  useEffect(() => {
    checkWalletIsConnected()
  }, [])

  return (
    <div className="App">
        {currentAccount ? showShop() : connectWalletButton() }
    </div>
  );
}

export default App;
