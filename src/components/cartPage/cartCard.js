import React from 'react';
import {Link} from "react-router-dom";

const cartCard = ({id, name, price, quantity, value, products, deleteCartItem, increaseQuantity, decreaseQuantity}) => {
  const cartItem = products && products.length 
        ?  products.map(item => ({id: item._id, images: item.images}))
            .filter( item => item.id === id)[0]
        : null;
  const images = cartItem && cartItem.images;
  const imageLink = images && images.length ? images[2] : "images/shop-widget-02.jpg";
  return (
    <tr>
      <td><img src={`${imageLink}`} alt=""/></td>
      <td className="cart-title"><Link to={`/product_detail/${id}`} >{name}</Link></td>
      <td>${price}</td>
      <td>
        <form className="qty-btns">
          <div className="qtyminus" onClick={() => decreaseQuantity({id, name, price}, -1)}></div>
          <input type='text' name="quantity" value={quantity} className="qty" readOnly={true} />
          <div className="qtyplus" onClick={() => increaseQuantity({id, name, price}, 1)}></div>
        </form>
        </td>
        <td className="cart-total">${value}</td>
        <td><button className="cart-remove" onClick={ () => deleteCartItem(id)}></button></td>
    </tr>
  );
};

export default cartCard;