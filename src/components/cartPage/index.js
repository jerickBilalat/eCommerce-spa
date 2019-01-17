import React, { Component } from 'react';
import { connect } from 'react-redux';

import { syncCart, deleteCartItem, increaseCartItemQuantity, decreaseCartItemQuantity } from '../../actions/cartActions';

import Cart from "./cart";
import OrderConfirm from "./orderConfirm";
import Layout from "../layout/defaultLayout";

class CartPage extends Component {

  state = {
    showOrderConfirm: false
  }

  componentDidMount() {
    this.props.dispatch(syncCart());
  }

  deleteCartItem = (id) => {
    this.props.dispatch(deleteCartItem(id));
  }

  increaseQuantity = (productDetials, differential) => {
    this.props.dispatch(increaseCartItemQuantity(productDetials, differential));
  }

  decreaseQuantity = (productDetials, differential) => {
    this.props.dispatch(decreaseCartItemQuantity(productDetials, differential));
  }

  renderContent = () => {
    const { props, state, deleteCartItem, increaseQuantity, decreaseQuantity } = this;

    if(state.showOrderConfirm) return (<OrderConfirm doGoBackToCart={() => this.setState({showOrderConfirm: false})} />)
    
    return <Cart 
      cartItems={props.cart.cartItems} 
      deleteCartItem={deleteCartItem} 
      doRenderOrderConfirm={() => this.setState({showOrderConfirm: true})}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      />}

  render() {
    return (
      <Layout>
        <React.Fragment>
          {this.renderContent()}
        </React.Fragment>
      </Layout>
    );
  }
}


function mapStateToProps(state){
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(CartPage);