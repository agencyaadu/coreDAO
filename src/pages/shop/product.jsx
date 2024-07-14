import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";


export const Product = (props) => {
  const { id, productName, price, productImage, reward } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  
// Example structure of a product object
  
  const cartItemCount = cartItems[id];

  return (
    <div className="product">
      <img src={productImage} height="400px" />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> ₹{price} Reward: 🌊{reward}</p>   
      </div>
       
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};
