import React, { Component } from 'react';
import {connect} from 'react-redux';
import ProductDetail from "./productDetail";
import Widgets from "../sideWidgets";
import Layout from "../layout/defaultLayout";
import { getProductDetail, clearProductDetail } from '../../actions/productActions';
import { increaseCartItemQuantity } from '../../actions/cartActions';
import { Link } from "react-router-dom";
import {CLIENT_MAIN_DOMAIN_URL as baseURL} from "../../constants";

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
        {prodDetail && 
          (
            <div className="row">
              <div id="titlebar">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">

                      <h1 style={{fontSize: 14}}>{prodDetail.name}</h1>
                      
                      <nav id="breadcrumbs">
                        <ul>
                          <li><a href={`${baseURL}`} >Home</a></li>
                          <li><Link to={"/shop"}>Shop</Link></li>
                          <li>Product Detail</li>
                        </ul>
                      </nav>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        
        <div className="row">
          {prodDetail ? 
            <ProductDetail prodDetail={prodDetail} increaseQuantity={this.doIncreaseCartItemQuantity}/>
            : <h4>Loading Product Detail...</h4>
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