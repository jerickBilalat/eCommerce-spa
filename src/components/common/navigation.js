import React, { Component, Fragment } from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames"

class navigation extends Component {

  renderQuantity() {
    const {cartItemsQuantity} = this.props;
    return cartItemsQuantity > 0 ? (<span className="cart-counter">{cartItemsQuantity}</span>) : null
  }


  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row">
          <div className="col-md-12">
            
            <nav id="navigation">

              <ul className="menu" id="responsive">

                <li><Link className="current" to="/">Shop</Link></li>
                <li className="search"><a href="#"><i className="fa fa-search"></i></a></li>
                <li className="cart-icon">
                  <Link to="/cart">
                    <i className="fa fa-shopping-cart"></i>
                    {this.renderQuantity()}
                  </Link>
                </li>

              </ul>
            </nav>
          </div>
          </div>
        </div>
        <div className="clearfix"></div>


        <div id="titlebar">
          <div className="container">
            <div className="row">
              <div className="col-md-12">

                <h2>Shop</h2>
                
                <nav id="breadcrumbs">
                  <ul>
                    <li><a href="#">Home</a></li>
                    <li>Shop</li>
                  </ul>
                </nav>

              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const getCartItemCount = (state) => {
  return state.cart.cartItems.length;
}

function mapStateToProps(state) {
  return {
    cartItemsQuantity: getCartItemCount(state)
  }
}

export default connect(mapStateToProps)(navigation);

