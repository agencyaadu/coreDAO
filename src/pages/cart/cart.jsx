  import React, { useContext, useState } from "react";
  import { ShopContext } from "../../context/shop-context";
  import { PRODUCTS } from "../../products";
  import { CartItem } from "./cart-item";
  import { useNavigate } from "react-router-dom";
  import { ethers } from 'ethers'
  import Water from "../../contract/Water.json"
  import TPurchase from "../../contract/TPurchase.json"

  import "./cart.css";
  export const Cart = () => {
    const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    const [totalReward, setTotalReward] = useState();

    const navigate = useNavigate();

    const currentAccount = localStorage.getItem("userWalletAddress")

    console.log("afd"+currentAccount)

    
    // const TPurchaseContractAddress = '0x58ddc9e1a890119e92fd502da4c1da28bc38603a'
      const TPurchaseContractAddress = '0x01Dda2C9e11974562cB2e13E31ea1c1Bf3274C6E'
      const TPurchaseABI = TPurchase

      const WaterContractAddress = '0x62B5666d596F0e476b1Bc699C8355308bBB73D73'
      const WaterABI = Water
    
      const storePurchase = async () => {
        let totalReward = 0;
        try {
          const { ethereum } = window
      
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner()
            const TPurchaseContract = new ethers.Contract(
              TPurchaseContractAddress,
              TPurchaseABI,
              signer
            )

            console.log(TPurchaseContract)

            

            for (let i = 0; i < PRODUCTS.length; i++) {
              const product = PRODUCTS[i];
              const quantity = cartItems[product.id];
              
              if (quantity !== 0) {
                console.log('Write to contract')
                console.log(currentAccount)
                const reward_tx = await TPurchaseContract.purchaseProduct(
                  currentAccount,
                  product.id, 
                  product.productName, 
                  product.productType, 
                  quantity, 
                  product.price, 
                  product.reward
                )
                totalReward += quantity * product.reward
                
                
                console.log('Wait for the transaction to be confirmed')
                await reward_tx.wait()
          
                console.log(
                  `Transaction confirmed: https://scan.test.btcs.network/tx/${reward_tx.hash}`
                )
                
              }
            }
            console.log('jv'+totalReward)
            localStorage.setItem('totalReward',totalReward)
            // console.log(`Product ID: ${product.id}, Quantity: ${quantity}, Reward: ${product.reward}`);
        
      
          } else {
            console.log('Ethereum object does not exist')
          }
        } catch (err) {
          console.log(err)
        }
      }



    return (
      <div className="cart">
        <div>
          <h1>Your Cart Items</h1>
        </div>
        <div className="cart">
          {PRODUCTS.map((product) => {
            if (cartItems[product.id] !== 0) {
              return <CartItem key={product.id} data={product} />;
            }
          })}

        </div>

        {totalAmount > 0 ? (
          <div className="checkout">
            <p> Subtotal: ${totalAmount} </p>
            <button onClick={() => navigate("/")}> Continue Shopping </button>
            <button
              onClick={() => {
                checkout();
                // calculateReward();
                storePurchase();
                navigate("/reward");
              }}
            >
              {" "}
              Checkout{" "}
            </button>
          </div>
        ) : (
          <h1> Your Shopping Cart is Empty</h1>
        )}
      </div>
    );
  };
