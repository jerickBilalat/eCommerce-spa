import React, { Component } from 'react';
import PopularProductsWidget from "./popularProductsWidget";
import CartWidget from "./cartWidget";
import {connect} from 'react-redux';
import { deleteCartItem } from '../../actions/cartActions';

class Widgets extends Component {

  removeLocalCartItem = (id) => {
    this.props.dispatch(deleteCartItem(id));
  }

  render() {
    return (
      <React.Fragment>
        <CartWidget cartItems={this.props.cart.cartItems} removeItem={this.removeLocalCartItem} />
        <PopularProductsWidget />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state){
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Widgets);