import React, { Component } from "react";
import { connect } from "react-redux";
import currency from "currency.js";
import { getSubTotal, getShippingTotal } from "../../reducers/cartReducer";
import FlashMessage from "../common/flashMessage";

import {
  syncCart,
  deleteCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity
} from "../../actions/cartActions";

import Cart from "./cart";
import OrderConfirm from "./orderConfirm";
import Layout from "../layout/defaultLayout";

class CartPage extends Component {
  state = {
    showOrderConfirm: false,
    formFields: {
      name: "",
      email: "",
      phone: "",
      message: "none"
    },
    formErrors: {}
  };

  updateFormState = event => {
    const field = event.target.name;
    let formFields = { ...this.state.formFields };
    formFields[field] = event.target.value;
    return this.setState({ formFields });
  };
  submitForm = event => {
    event.preventDefault();

    // if (!this.courseFormIsValid()) {
    //   return;
    // }
    this.setState({ showOrderConfirm: true });
  };
  componentDidMount() {
    this.props.dispatch(syncCart());
  }

  deleteCartItem = id => {
    this.props.dispatch(deleteCartItem(id));
  };

  increaseQuantity = (productDetials, differential) => {
    this.props.dispatch(increaseCartItemQuantity(productDetials, differential));
  };

  decreaseQuantity = (productDetials, differential) => {
    this.props.dispatch(decreaseCartItemQuantity(productDetials, differential));
  };

  renderContent = () => {
    const {
      props,
      state,
      deleteCartItem,
      increaseQuantity,
      decreaseQuantity
    } = this;

    if (state.showOrderConfirm)
      return (
        <OrderConfirm
          formFields={this.state.formFields}
          cartItems={props.cart.cartItems}
          subTotal={props.subTotal}
          shippingTotal={props.shippingTotal}
          total={props.total}
          doGoBackToCart={() => this.setState({ showOrderConfirm: false })}
        />
      );
    return (
      <Cart
        formFields={this.state.formFields}
        updateFormState={this.updateFormState}
        formErrors={this.state.formErrors}
        submitForm={this.submitForm}
        cartItems={props.cart.cartItems}
        subTotal={props.subTotal}
        shippingTotal={props.shippingTotal}
        total={props.total}
        deleteCartItem={deleteCartItem}
        doRenderOrderConfirm={() => this.setState({ showOrderConfirm: true })}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />
    );
  };

  renderFlashMessage = () => {
    const { props } = this;
    return (
      props.flashMessage && (
        <FlashMessage
          status={props.flashMessage.status}
          title={props.flashMessage.title}
          texts={props.flashMessage.texts}
        />
      )
    );
  };

  render() {
    return (
      <Layout>
        {this.renderFlashMessage()}
        {this.renderContent()}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const subTotal = getSubTotal(state),
    shippingTotal = getShippingTotal(state),
    total = currency(subTotal)
      .add(shippingTotal)
      .format();
  return {
    cart: state.cart,
    flashMessage: state.cart.flashMessage,
    subTotal,
    shippingTotal,
    total
  };
}

export default connect(mapStateToProps)(CartPage);
