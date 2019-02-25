import React, {Fragment} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

import './css/style.css';
import './css/colors/blue.css'

import { syncCart } from './actions/cartActions';

import ProductListPage from "./components/plp";
import ProductDetailPage from "./components/pdp";
import CartPage from "./components/cartPage";
import HomePage from "./components/home";
import ProdDetail2 from "./components/cartPage/prodDetail2";
class App extends React.Component {
	componentDidMount() {
		this.props.dispatch(syncCart());
	}
	notify = (status, message) => {
		switch(status) {
			case "success":
				return toast.success(message, {
					position: toast.POSITION.TOP_RIGHT
				});
			case "error":
				return toast.error(message, {
					position: toast.POSITION.TOP_RIGHT
				});
			case "info":
				return toast.info(message, {
					position: toast.POSITION.BOTTOM_LEFT
				});
			case "warn":
				return	toast.warn(message, {
					position: toast.POSITION.BOTTOM_RIGHT
				});
			default:
				return toast("Default Notification !");
		}
  }
  render() {
    return (
			<Fragment>
				<ToastContainer />
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Route path="/shop" exact 
						render={ props => (
							<ProductListPage {...props} notify={this.notify}/>
						)}
					/>
					<Route path="/product_detail/:id" exact 
						render={ props => (
							<ProductDetailPage {...props} notify={this.notify}/>
						)}
					/>
					<Route path="/product_detail2/:id" exact 
						render={ props => (
							<ProdDetail2 {...props} notify={this.notify}/>
						)}
					/>
					<Route path="/cart" exact 
						render={ props => (
							<CartPage {...props} notify={this.notify}/>
						)}
					/>
				</Switch>
			</Fragment>
			
    );
  }
}

export default withRouter(connect()(App));
