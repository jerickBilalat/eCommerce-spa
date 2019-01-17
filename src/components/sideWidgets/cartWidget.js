import React from "react";
import WidgetCartCard from "./widgetCartCard";

const cartWidget = props => {
  const { cartItems, removeItem } = props;
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
          Subtotal: <strong>$100</strong>
        </span>

        <a href="#" className="button gray">
          View Cart
        </a>
        <a href="#" className="button margin-top-5">
          Checkout
        </a>
      </div>
    </div>
  );
};

export default cartWidget;
