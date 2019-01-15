import React from 'react';

const cartCard = ({_id, name, price, quantity, deleteCartItem, increaseQuantity, decreaseQuantity}) => {
  return (
    <tr>
      <td><img src="images/shop-widget-02.jpg" alt=""/></td>
      <td className="cart-title"><a href="#" >{name}</a></td>
      <td>{price}</td>
      <td>
        <form className="qty-btns">
          <div className="qtyminus" onClick={() => decreaseQuantity(_id, -1)}></div>
          <input type='text' name="quantity" value={quantity} className="qty" readOnly={true} />
          <div className="qtyplus" onClick={() => increaseQuantity(_id, 1)}></div>
        </form>
        </td>
        <td className="cart-total">$999</td>
        <td><a href="#" className="cart-remove" onClick={ () => deleteCartItem(_id)}></a></td>
    </tr>
  );
};

export default cartCard;