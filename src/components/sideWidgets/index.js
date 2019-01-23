import React, { Component } from 'react';
import CartWidget from "./cartWidget";
import {connect} from 'react-redux';
import { deleteCartItem } from '../../actions/cartActions';
import {getSubTotal} from "../../reducers/cartReducer";

class Widgets extends Component {

  removeLocalCartItem = (id) => {
    this.props.dispatch(deleteCartItem(id));
  }

  render() {
    return (
      <React.Fragment>
        <CartWidget cartItems={this.props.cart.cartItems} removeItem={this.removeLocalCartItem} subTotal={this.props.subTotal} />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state){
  return {
    cart: state.cart,
    subTotal: getSubTotal(state)
  }
}

export default connect(mapStateToProps)(Widgets);