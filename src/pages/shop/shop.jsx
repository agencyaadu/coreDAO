import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";
import { WaterContractAddress, CORESCAN_BASE_URL } from "../../constant";


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
            className="ml-2 text-mm  text-blue-400 hover:text-blue-600"
            href={CORESCAN_BASE_URL.concat(WaterContractAddress)}
            rel="noreferrer"
          >
            {WaterContractAddress}
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
