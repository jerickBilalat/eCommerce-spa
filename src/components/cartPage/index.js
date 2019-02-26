import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import currency from "currency.js";
import { getSubTotal, getShippingTotal } from "../../reducers/cartReducer";
import FlashMessage from "../common/flashMessage";
import { toast } from "react-toastify";
import { clearCart, flashMessage } from "../../actions/cartActions";
import { fetchProducts } from "../../actions/productActions";
import { Link } from "react-router-dom";
import ScrollTo from "../common/scrollTo";


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
    if(!event.isTrusted) return;
    
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
      const formFields = { ...this.state.formFields};
      this.setState({formFields});
    }
    this.setState({ showOrderConfirm: true });
    return window.scrollTo(0, 140);
  };

  submitOrderForm = event => {
    event.preventDefault();
    this.props.dispatch(clearCart());
    this.props.dispatch(flashMessage(null));
    toast.success("Order submited");
    this.setState({showOrderConfirm: false});
    this.props.history.push('/shop');
  }

  courseFormIsValid = () => {
    let  isFormValid = true;
    const errors = {};
    const { formFields } = this.state;

    const validEmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

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
    
    
    let phoneNumber = formFields.phone;
    if (phoneRegex.test(phoneNumber)) {
        let formattedPhoneNumber = phoneNumber.replace(phoneRegex, "($1) $2-$3");
        this.setState({ formFields: {phone: formattedPhoneNumber}})
    } else {
      isFormValid = false;
      errors.phone = "Enter a valid phone number";
    }
    
    
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
        <Fragment>
          <OrderConfirm
            formFields={this.state.formFields}
            cartItems={props.cart.cartItems}
            subTotal={props.subTotal}
            shippingTotal={props.shippingTotal}
            total={props.total}
            doGoBackToCart={() => this.setState({ showOrderConfirm: false })}
            submitOrderForm={this.submitOrderForm}
          />
        </Fragment>
      );
    return (
      <Fragment>
        <ScrollTo />
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
      </Fragment>
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
          <div id="titlebar">
            <div className="container">
              <div className="row">
                <div className="col-md-12">

                  <h2>Cart</h2>
                  
                  <nav id="breadcrumbs">
                    <ul>
                      <li><Link to={"/"}>Home</Link></li>
                      <li><Link to={"/shop"}>Shop</Link></li>
                      <li>Cart</li>
                    </ul>
                  </nav>

                </div>
              </div>
            </div>
          </div>
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
