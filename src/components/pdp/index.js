import React, { Component } from 'react';
import {connect} from 'react-redux';
import ProductDetail from "./productDetail";
import Widgets from "../sideWidgets";
import Layout from "../layout/defaultLayout";
import { getProductDetail, clearProductDetail } from '../../actions/productActions';
import { increaseCartItemQuantity } from '../../actions/cartActions';
import { toast } from "react-toastify";


class productDetailPage extends Component {

  componentDidMount() {
    const id = this.props.match.params.id;
      this.props.dispatch(getProductDetail(id)).then(()=>{
        if(!this.props.products.prodDetail){
          // to do: include notification
          this.props.history.push('/');
        }
      })
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }

  doIncreaseCartItemQuantity = (prodDetail, differential) => {
    this.props.dispatch(increaseCartItemQuantity(prodDetail, differential))
  }

  render() {
    const {prodDetail} = this.props.products;
    return (
      <Layout>
        <div className="row">
          {prodDetail ? 
            <ProductDetail prodDetail={prodDetail} increaseQuantity={this.doIncreaseCartItemQuantity}/>
            : <h3>Loading ...</h3>
          }
          <div className="col-md-3 col-sm-5">
            <Widgets />
            <div className="clearfix"></div>
            <div className="margin-bottom-40"></div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(productDetailPage);