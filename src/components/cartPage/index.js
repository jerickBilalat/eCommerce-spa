import React, { Component } from "react";
import { connect } from "react-redux";
import currency from "currency.js";
import { getSubTotal, getShippingTotal } from "../../reducers/cartReducer";
import FlashMessage from "../common/flashMessage";
import TitleBar from "../common/titleBar";
import { toast } from "react-toastify";
import { clearCart, flashMessage } from "../../actions/cartActions";
import { fetchProducts } from "../../actions/productActions";


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
      message: ""
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

    if (!this.courseFormIsValid()) {
      return toast.error("Form is not valid");
    }
    if(this.state.formFields.message === "") {
      this.setState({formFields: {message: "none"}})
    }
    return this.setState({ showOrderConfirm: true });
  };

  submitOrderForm = event => {
    event.preventDefault();
    this.props.dispatch(clearCart());
    this.props.dispatch(flashMessage(null));
    toast.success("Order submited");
    return this.setState({showOrderConfirm: false});
  }

  courseFormIsValid = () => {
    let  isFormValid = true;
    const errors = {};
    const { formFields } = this.state;

    const validEmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(formFields.name.length <= 0){
      isFormValid = false;
      errors.name = "Name is required";
    }
    
    if(formFields.email.length <= 0){
      isFormValid = false;
      errors.email = "Email is required";
    } else if(!validEmailPattern.test(String(formFields.email).toLowerCase())) {
      isFormValid = false;
      errors.email = "Enter a valid email";
    }
    
    // validate phone
    
    
    this.setState({formErrors: errors});
    return isFormValid;
  }

  componentDidMount() {
    this.props.dispatch(syncCart());
    this.props.dispatch(fetchProducts(0, 1000, [], []));
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
          submitOrderForm={this.submitOrderForm}
        />
      );
    return (
      <Cart
        formFields={this.state.formFields}
        updateFormState={this.updateFormState}
        formErrors={this.state.formErrors}
        submitForm={this.submitForm}
        cartItems={props.cart.cartItems}
        products={props.toShop}
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
        <div className="row">
          <TitleBar title="Cart"/>
        </div>
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
    total,
    toShop: state.products.toShop
  };
}

export default connect(mapStateToProps)(CartPage);
