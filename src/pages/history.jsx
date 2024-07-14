import React, { useEffect, useState } from "react";
import { ethers } from 'ethers'
import { TPurchaseContractAddress, TPurchaseABI } from "../constant";

export const History = () => {

  const [ transactions, setTransactions ] = useState([]);

  const pastTransaction = async () => {
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
  
        console.log('Write to contract')
        const reward_tx = await TPurchaseContract.getAllPurchases()
  
        console.log('Wait for the transaction to be confirmed')
        // await reward_tx.wait()

        console.log(reward_tx)
        setTransactions(reward_tx)
  
        console.log(
          `Transaction confirmed: https://scan.test.btcs.network/tx/${reward_tx.hash}`
        )
  
      } else {
        console.log('Ethereum object does not exist')
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    pastTransaction()
  }, [])

  return (
    <div className="shop">
      <div className="shopTitle">
          {/* <button onClick={pastTransaction()}>Past Transaction</button> */}
        <h1>🌊 See Past Transaction</h1>
        <table>
        <thead>
          <tr>
            <th>T ID</th>
            <th>User Wallet Address</th>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Product Quantity</th>
            <th>Product Cost</th>
            <th>Reward</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{transaction[0]}</td>
              <td>{transaction[2]}</td>
              <td>{transaction[3]}</td>
              <td>{transaction[4]}</td>
              <td>{transaction[5].toString()}</td>
              <td>{transaction[6].toString()}</td>
              <td>{transaction[7].toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};
