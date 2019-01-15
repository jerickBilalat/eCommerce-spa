import React, { Component } from 'react';
import ProductCard from "../common/productCard";
import {Link} from "react-router-dom";
import { increaseCartItemQuantity } from '../../actions/cartActions';


class productDetail extends Component {
  render() {
    const {name} = this.props.detail;
    return (
      <React.Fragment>
        <div className="col-md-12 extra-gutter-right">
          <div className="with-btn margin-bottom-20">
            <Link to="/"><a className="button border medium">Back to shop</a></Link>
          </div>
        </div>
        <div className="col-md-9 col-sm-7 extra-gutter-right">
          <div className="row">
            <div className="col-md-6">
              <div className="simple-slider shop">
                <ul className="slides">
                  <li><img src="images/shop-09a.jpg" alt="" /></li>
                </ul>
              </div>
            </div>

            <div className="col-md-6">

              <div className="product-details">

                <h4>{name}</h4>
                <span className="price"><del>$129</del> <mark>$99</mark></span>
                <span className="divider"></span>
                <p>Etiam lobortis dolor eros sed lorem sodales imperdiet dapibus. Maecenas faucibus urna sed turpis lacinia consectetur. Mauris dolor bibendum nibh consectetuer.<br/></p>
                <form action="#">
                    <div className="qtyminus"></div>
                    <input type="text" name="quantity" value='1' className="qty" />
                    <div className="qtyplus"></div>
                </form>

                <div className="clearfix"></div>

                <a className="button">Add to Cart</a>

              </div>
            </div>
          </div>

          <div className="margin-top-35"></div>

          <div className="row">
            <div className="col-md-12">

              <ul className="tabs-nav">
                <li className="active"><a >Description</a></li>
                <li><a >Additional Information</a></li>
              </ul>

              <div className="tabs-container">
                <div className="tab-content" id="tab1">
                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>


                  <ul className="list-1 alt margin-bottom-20">
                    <li>Justo duo dolores et ea rebum</li>
                    <li>Duis autem vel eum iriure dolor</li>
                    <li>Stet clita kasd gubergren</li>
                  </ul>


                  <p>In hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait.</p>

                </div>

                <div className="tab-content" id="tab2">
                  <table className="basic-table">
                    <tbody>
                      <tr>
                        <td>Maximum RPM</td>
                        <td>11 000</td>
                      </tr>

                      <tr>
                        <td>Adjustable Handle Position</td>
                        <td>Yes</td>
                      </tr>

                      <tr>
                        <td>Switch Type</td>
                        <td>Paddle</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>


              <h4 className="headline with-border margin-top-50 margin-bottom-35">Related Products</h4>
              <div className="row">
                
                <ProductCard />
                
                <ProductCard />
                
                <ProductCard />
              </div>


            </div>
          </div>
        </div>
	    </React.Fragment>
    );
  }
}

export default productDetail;