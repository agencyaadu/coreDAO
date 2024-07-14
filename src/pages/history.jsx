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
        <h1>🌊 Transaction History</h1>
        <br/>
        <div className="flex justify-center">
        <table>
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 border border-gray-300 uppercase tracking-wider" >T ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 border border-gray-300 uppercase tracking-wider" >User Wallet Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 border border-gray-300 uppercase tracking-wider" >Product Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 border border-gray-300 uppercase tracking-wider" >Product Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 border border-gray-300 uppercase tracking-wider" >Product Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 border border-gray-300 uppercase tracking-wider" >Product Cost</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 border border-gray-300 uppercase tracking-wider" >Reward</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 border border-gray-300 uppercase tracking-wider" >Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="text-xs px-6 py-4 whitespace-wrap border border-gray-300" >{index + 1}</td>
              <td className="text-xs px-6 py-4 whitespace-wrap border border-gray-300" >{transaction[0].toString()}</td>
              <td className="text-xs px-6 py-4 whitespace-wrap border border-gray-300" >{transaction[2]}</td>
              <td className="text-xs px-6 py-4 whitespace-wrap border border-gray-300" >{transaction[3]}</td>
              <td className="text-xs px-6 py-4 whitespace-wrap border border-gray-300" >{transaction[4]}</td>
              <td className="text-xs px-6 py-4 whitespace-wrap border border-gray-300" >{transaction[5].toString()}</td>
              <td className="text-xs px-6 py-4 whitespace-wrap border border-gray-300" >{transaction[6].toString()}</td>
              <td className="text-xs px-6 py-4 whitespace-wrap border border-gray-300" >{transaction[7].toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      </div>
    </div>
  );
};
