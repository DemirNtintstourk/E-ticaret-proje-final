import React, { useContext } from "react";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url, currency } from "../../App";

const CartItems = () => {
  const {products} = useContext(ShopContext);
  const {cartItems,removeFromCart,getTotalCartAmount} = useContext(ShopContext);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Ürünler</p>
        <p>Ürün adı</p>
        <p>Fiyat</p>
        <p>Miktar</p>
        <p>Toplam</p>
        <p>Kaldır</p>
      </div>
      <hr />
      {products.map((e)=>{

        if(cartItems[e.id]>0)
        {
          return  <div>
                    <div className="cartitems-format-main cartitems-format">
                      <img className="cartitems-product-icon" src={backend_url+e.image} alt="" />
                      <p cartitems-product-title>{e.name}</p>
                      <p>{currency}{e.new_price}</p>
                      <button className="cartitems-quantity">{cartItems[e.id]}</button>
                      <p>{currency}{e.new_price*cartItems[e.id]}</p>
                      <img onClick={()=>{removeFromCart(e.id)}} className="cartitems-remove-icon" src={cross_icon} alt="" />
                    </div>
                     <hr />
                  </div>;
        }
        return null;
      })}
      
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Tutar</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Toplam Fiyat</p>
              <p>{currency}{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Kargo Masrafı</p>
              <p>Bedava</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Toplam</h3>
              <h3>{currency}{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>Ödeme</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
