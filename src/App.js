import React from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './css/style.css';
import './css/colors/blue.css'

import { syncCart } from './actions/cartActions';

import ProductListPage from "./components/plp";
import ProductDetailPage from "./components/productDetailPage";
import Cart from "./components/cartPage";

const Test = () => {
	return (
		<div>
			<Link to="cart">cart</Link>
		</div>
	);
};


class App extends React.Component {
	componentDidMount() {
		this.props.dispatch(syncCart())
	}
  render() {
    return (
			<Switch>
				<Route path="/" exact component={ProductListPage}/>
				<Route path="/test" exact component={Test}/>
				<Route path="/product_detail/:id" exact component={ProductDetailPage}/>
				<Route path="/cart" exact component={Cart}/>
			</Switch>
    );
  }
}

export default withRouter(connect()(App));
