import React from "react";
import WidgetCartCard from "./widgetCartCard";
import {Link} from "react-router-dom";

const cartWidget = ({cartItems, removeItem, subTotal}) => {
  return (
    <div className="widget">
      <div className="headline no-margin">
        <h4>Shopping Cart</h4>
      </div>
      <div id="cart">
        {cartItems.length ? (
          cartItems.map(item => (
            <WidgetCartCard key={item.id} {...item} removeItem={removeItem} />
          ))
        ) : (
            <p>No cart items</p>
        )}
        <span className="cart-subtotal">
          Subtotal: <strong>${subTotal}</strong>
        </span>
        <Link to="/cart" className="button gray">View Cart</Link>
      </div>
    </div>
  );
};

export default cartWidget;
