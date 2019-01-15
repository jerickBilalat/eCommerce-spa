import React from "react";

const WidgetCartCard = props => (
  <ul className="cart-items">
    <li>
      <a href="#" className="cart-item-title">
        {props.name}
      </a>
      <span className="cart-item-amount">
        <a className="item-remove" onClick={() => props.removeItem(props.id)}>
          <i className="fa fa-remove" />
        </a>{" "}
        {props.quantity}{" "}
      </span>
    </li>
  </ul>
);

const cartWidget = props => {
  const { cartItems, removeItem } = props;
  console.log(cartItems);
  return (
    <div className="widget">
      <div className="headline no-margin">
        <h4>Shopping Cart</h4>
      </div>
      <div id="cart">
        {cartItems.length ? (
          cartItems.map(item => (
            <WidgetCartCard key={item._id} {...item} removeItem={removeItem} />
          ))
        ) : (
          <p>No items</p>
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
