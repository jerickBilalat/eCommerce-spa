import React from 'react';

const cartCard = ({id, quantity, deleteCartItem, increaseQuantity, decreaseQuantity}) => {
  return (
    <tr>
      <td><img src="images/shop-widget-02.jpg" alt=""/></td>
      <td className="cart-title"><a href="#" >Productname</a></td>
      <td>$999</td>
      <td>
        <form className="qty-btns">
          <div className="qtyminus" onClick={() => decreaseQuantity(id, -1)}></div>
          <input type='text' name="quantity" value={quantity} className="qty" readOnly={true} />
          <div className="qtyplus" onClick={() => increaseQuantity(id, 1)}></div>
        </form>
        </td>
        <td className="cart-total">$999</td>
        <td><a href="#" className="cart-remove" onClick={ () => deleteCartItem(id)}></a></td>
    </tr>
  );
};

export default cartCard;