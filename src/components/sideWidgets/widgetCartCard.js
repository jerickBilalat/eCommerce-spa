import React from 'react';

const widgetCartCard = ({id, name, quantity, removeItem}) => {
  return (
    <ul className="cart-items">
      <li>
        <a href="#" className="cart-item-title">{name}</a>
        <span className="cart-item-amount"><a className="item-remove" onClick={() => removeItem(id)}><i className="fa fa-remove"></i></a> qty: {quantity} </span>
      </li>
    </ul>
  );
};

export default widgetCartCard;