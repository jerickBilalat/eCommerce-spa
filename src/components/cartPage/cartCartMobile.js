import React from 'react';
import {Link} from "react-router-dom";

const cartCardMobile = ({id, name, price, quantity, value, deleteCartItem, increaseQuantity, decreaseQuantity}) => {
  return (
    <React.Fragment>
      <tr className="st-space">
        <td></td>
        <td></td>
      </tr>
      <tr className="st-new-item">
        <td className="st-key"></td>
        <td className="st-val st-head-row">
          <img src="images/shop-widget-02.jpg" alt="" />
        </td>
      </tr>
      <tr>
        <td className="st-key">Description</td>
        <td className="st-val">
          <Link to={`/product_detail/${id}`} >{name}</Link>
        </td>
      </tr>
      <tr>
        <td className="st-key">Price</td>
        <td className="st-val">${price}</td>
      </tr>
      <tr>
        <td className="st-key">Quantity</td>
          <td className="st-val">
            <form className="qty-btns">
              <div className="qtyminus" onClick={() => decreaseQuantity({id, name, price}, -1)}></div>
              <input type='text' name="quantity" value={quantity} className="qty" readOnly={true} />
              <div className="qtyplus" onClick={() => increaseQuantity({id, name, price}, 1)}></div>
            </form>
        </td>
      </tr>
      <tr>
        <td className="st-key">Total</td>
        <td className="st-val">${value}</td>
      </tr>
      <tr>
        <td className="st-key"></td>
        <td className="st-val">
          <button className="cart-remove" onClick={ () => deleteCartItem(id)}></button>
        </td>
      </tr>
    </React.Fragment>

  );
};

export default cartCardMobile;