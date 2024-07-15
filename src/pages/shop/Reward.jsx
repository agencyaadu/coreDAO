import React, { useContext, useEffect, useState } from "react";
import { PRODUCTS } from "../../products";
import { ShopContext } from "../../context/shop-context";
import { Product } from "./product";
import "./shop.css";
import "../../App.css"
import { ethers } from 'ethers'
import { WaterContractAddress, WaterABI } from "../../constant";
import { useNavigate } from "react-router-dom";



export const Reward = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const [disabled, setDisabled] = useState(false);

  const handleClick = () => {
    setDisabled(true);
  }

  const currentAccount = localStorage.getItem("userWalletAddress")

  const navigate = useNavigate();

  console.log("afd"+currentAccount)
  
    const rewardSystem = async () => {
      try {
        const { ethereum } = window
    
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const WaterContract = new ethers.Contract(
            WaterContractAddress,
            WaterABI,
            signer
          )

          console.log(WaterContract)
    
          console.log('Write to contract')
          console.log(currentAccount)
          const reward_tx = await WaterContract.claimReward(localStorage.getItem('totalReward'))
    
          console.log('Wait for the transaction to be confirmed')
          await reward_tx.wait()
    
          console.log(
            `Transaction confirmed: https://scan.test.btcs.network/tx/${reward_tx.hash}`
          )
          navigate('/')
    
        } else {
          console.log('Ethereum object does not exist')
        }
      } catch (err) {
        console.log(err)
      }
    }

    // useEffect(() => calculateReward(), [])
  return (
    <div className="shop">
      <div className="shopTitle">
        <br/>
        <h5>Please Wait... Accept Transaction to write data to the Smart Contract</h5>
        <br/>
        <br/>
        <h1 className="ml-2 text-mm  text-blue-400" >🌊 Click Claim Reward to Claim {localStorage.getItem('totalReward')} Tokens</h1>
        {/* <button className="btn-primary w-100 rounded mt-10" onClick={rewardSystem}>Claim Reward</button> */}
        <button className="btn-primary w-100 rounded mt-10"           style={{
            backgroundColor: disabled ? '#CCCCCC' : '#007bff',
            color: disabled ? '#666666' : '#ffffff',
            cursor: disabled ? 'not-allowed' : 'pointer'
          }}
          disabled={disabled} onClick={()=>{
          handleClick()
          rewardSystem();
        }}> {disabled ? 'Claiming Reward...' : 'Claim Reward'}</button>
      </div>
    </div>
  );
};
