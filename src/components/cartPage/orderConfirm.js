import React, { Component, Fragment } from 'react';

class orderForm extends Component {
  render() {
    return (

      <Fragment>
      <div className="row">
        <div className="col-xs-12">

    		  <div className="invoice-title">
    			  <h2>Order</h2><h3 className="pull-right"># 12345</h3>
    		  </div>

    		  <hr />

          <div className="row">

            <div className="col-xs-6">
              <address>
              <strong>Customer Info:</strong><br />
                John Smith<br />
                1234 Main<br />
                Apt. 4B<br />
                Springfield, ST 54321
              </address>
            </div>

            <div className="col-xs-6">
              <address>
                <strong>Message:</strong><br/>
                <p>none</p>
              </address>
            </div>
            
          </div>


    	</div>
    </div>
    
    <div className="row">
    	<div className="col-md-12">
    		<div className="panel panel-default">
    			<div className="panel-heading">
    				<h3 className="panel-title"><strong>Order summary</strong></h3>
    			</div>
    			<div className="panel-body">
    				<div className="table-responsive">
    					<table className="table table-condensed">
    						<thead>
                  <tr>
                    <td><strong>Item</strong></td>
                    <td className="text-center"><strong>Price</strong></td>
                    <td className="text-center"><strong>Quantity</strong></td>
                    <td className="text-right"><strong>Totals</strong></td>
                  </tr>
    						</thead>
    						<tbody>
    							<tr>
    								<td>BS-200</td>
    								<td className="text-center">$10.99</td>
    								<td className="text-center">1</td>
    								<td className="text-right">$10.99</td>
    							</tr>
                                <tr>
        							<td>BS-400</td>
    								<td className="text-center">$20.00</td>
    								<td className="text-center">3</td>
    								<td className="text-right">$60.00</td>
    							</tr>
                                <tr>
            						<td>BS-1000</td>
    								<td className="text-center">$600.00</td>
    								<td className="text-center">1</td>
    								<td className="text-right">$600.00</td>
    							</tr>
    							<tr>
    								<td className="thick-line"></td>
    								<td className="thick-line"></td>
    								<td className="thick-line text-center"><strong>Subtotal</strong></td>
    								<td className="thick-line text-right">$670.99</td>
    							</tr>
    							<tr>
    								<td className="no-line"></td>
    								<td className="no-line"></td>
    								<td className="no-line text-center"><strong>Shipping</strong></td>
    								<td className="no-line text-right">$15</td>
    							</tr>
    							<tr>
    								<td className="no-line"></td>
    								<td className="no-line"></td>
    								<td className="no-line text-center"><strong>Total</strong></td>
    								<td className="no-line text-right">$685.99</td>
    							</tr>
    						</tbody>
    					</table>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>

    <div className="row">
      <div className="col-xs-6">
        <input type="submit" className="submit" id="submit" value="Back" onClick={() => this.props.doGoBackToCart(false)} />
      </div>
      <div className="col-xs-6">
        <input type="submit" className="submit pull-right" id="submit" value="Submit Order" />
      </div>
    </div>
      
    </Fragment>
    );
  }
}

export default orderForm;