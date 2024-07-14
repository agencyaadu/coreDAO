import "./App.css";
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Reward } from "./pages/shop/Reward";
import { History } from "./pages/history";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";
import { WaterContractAddress, CORESCAN_BASE_URL } from "./constant";


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
      <div className="flex items-center justify-center h-screen">
      <div className="mx-auto max-w-screen-xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center px-2">
              {/* <img className="w-12 mx-1" src="src/public/logo.png" /> */}
              <p className="my-3 mx-1 text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              🌊 Waves
              </p>
            </div>
            <p className="my-3 text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Store
            </p>
          </div>
        </div>
        <button
        onClick={connectWalletHandler}
        className="btn-primary w-40 rounded mt-10"
      >
        Connect Wallet
      </button>
      </div>
      <div className="mt-8 text-center">
          <span className="text-mm">Connect Water Token address in your wallet </span>
          <a
            target="_blank"
            className="ml-2 text-mm  text-blue-400 hover:text-blue-600"
            href={CORESCAN_BASE_URL.concat(WaterContractAddress)}
            rel="noreferrer"
          >
            {WaterContractAddress}
          </a>
        </div>   
    </div>
    </div>

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
              <Route path="/history" element={<History />} />
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
