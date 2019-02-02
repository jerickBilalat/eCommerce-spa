import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import ProductDetail from "../pdp/productDetail";
import Widgets from "../sideWidgets";
import Layout from "../layout/defaultLayout";
import { getProductDetail } from '../../actions/productActions';
import { increaseCartItemQuantity } from '../../actions/cartActions';
import { toast } from "react-toastify";
import Header from "../common/mnRecHeader";
import Footer from "../common/footer";

class ProdDetail2 extends React.Component {

	componentDidMount() {
    const id = this.props.match.params.id;
      this.props.dispatch(getProductDetail(id)).then(()=>{
        if(!this.props.products.prodDetail){
          // to do: include notification
          this.props.history.push('/');
        }
        console.log(this.props.products.prodDetail);
        toast.success("prodDetails loaded");
      })
  }
	render() {
		return (
			<Fragment>
      <div className="container">
        <Header />
        <h1>Test</h1>
      </div>
      <Footer />
    </Fragment>
		)
	}
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(ProdDetail2);