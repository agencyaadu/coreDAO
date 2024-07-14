import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";

const waterContractAddress = '0x3c81c82655e98ae183a1d2fc4c038be15d2a252f'
const waterABI = Water

const CORESCAN_BASE_URL = 'https://scan.test.btcs.network/address/'

export const Shop = () => {
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>🌊 Waves Shop</h1>
      </div>
      <div className="mt-8 text-center">
          <span className="text-mm">Connect Water Token address in your wallet </span>
          <a
            target="_blank"
            className="ml-2 text-mm  text-orange-400 hover:text-orange-600"
            href={CORESCAN_BASE_URL.concat(waterContractAddress)}
            rel="noreferrer"
          >
            {contractAddress}
          </a>
        </div>   

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};
