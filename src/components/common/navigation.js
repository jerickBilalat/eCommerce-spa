import React, { Component, Fragment } from 'react';
import {Link, withRouter} from "react-router-dom";
import { connect } from "react-redux";

class navigation extends Component {

  renderQuantity() {
    const {cartItemsQuantity} = this.props;
    return cartItemsQuantity > 0 ? (<span className="cart-counter">{cartItemsQuantity}</span>) : null
  }

  renderLinks() {
    const navigationLinks =[
      {name: "Home", path: "/"},
      {name: "Shop", path: "/shop"}
    ]
    return navigationLinks.map( item => <li key={item.name}><Link className={(this.props.match.path === item.path && "current") || " "} to={item.path}>{item.name}</Link></li>)
  }

  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row">
          <div className="col-md-12">
            
            <nav id="navigation">

              <ul className="menu" id="responsive">

                {this.renderLinks()}
                <li className="current cart-icon">
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

export default withRouter(connect(mapStateToProps)(navigation));

