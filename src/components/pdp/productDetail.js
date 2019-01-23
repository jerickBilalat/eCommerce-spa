import React from 'react';
import {Link} from "react-router-dom";

const ProductDetail = ({_id, name, price, increaseQuantity}) => {
  const prodDetail = {id: _id, name, price};
  return (
    <React.Fragment>
        <div className="col-md-12 extra-gutter-right">
          <div className="with-btn margin-bottom-20">
            <Link to="/"><button className="button border medium">Back to shop</button></Link>
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
                <span className="price"><del>$129</del> <mark>{price}</mark></span>
                <span className="divider"></span>
                <p>Etiam lobortis dolor eros sed lorem sodales imperdiet dapibus. Maecenas faucibus urna sed turpis lacinia consectetur. Mauris dolor bibendum nibh consectetuer.<br/></p>

                <div className="clearfix"></div>

                <button className="button" onClick={() => increaseQuantity(prodDetail, 1)}>Add to Cart</button>

              </div>
            </div>
          </div>

          <div className="margin-top-35"></div>

          <div className="row">
            <div className="col-md-12">

              <ul className="tabs-nav">
                <li className="active"><span>Description</span></li>
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
            </div>
          </div>
        </div>
	    </React.Fragment>
  )
}

export default ProductDetail;