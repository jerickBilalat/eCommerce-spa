import React from 'react';
import CartCard from "./cartCard";


const cart = ({cartItems, deleteCartItem, increaseQuantity, decreaseQuantity, doRenderOrderConfirm }) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          <table className="cart-table responsive-table">
            <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
            </thead>
            
  
            <tbody>
              {cartItems.map(item => <CartCard 
                key={item.id} 
                {...item} 
                deleteCartItem={deleteCartItem}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                /> )}
            </tbody>
                
            
  
          </table>
  
        </div>
      </div>
  
  
      <div className="row">
  
      <div className="col-md-6">
        <div className="cart-totals">
          <h4 className="headline with-border margin-bottom-30">Cart Totals</h4>
  
          <table className="cart-table margin-top-5">
            <tbody>
              <tr>
                <th>Cart Subtotal</th>
                <td><strong>$99.00</strong></td>
              </tr>
  
              <tr>
                <th>Shipping and Handling</th>
                <td>Free Shipping</td>
              </tr>
  
              <tr>
                <th>Order Total</th>
                <td><strong>$99.00</strong></td>
              </tr>
            </tbody>
          </table>
  
        </div>
      </div>

      </div>

      <div className="row">
        <div className="col-sm-12">
  
          <section id="contact">
            <h4 className="headline with-border margin-top-10 margin-bottom-35">Customer Information</h4>
  
            <div id="contact-message"></div> 
  
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div>
                      <input name="name" type="text" id="name" placeholder="Your Name" required="required" />
                    </div>
                    
                    <div>
                      <input name="email" type="email" id="email" placeholder="Email Address" pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$" required="required" />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div>
                      <input name="phone" type="tel" id="phone" size="30" placeholder="Phone number (optional)" />
                    </div>
                  </div>
                </div>
  
                <div>
                  <textarea name="comments" cols="40" rows="3" id="comments" placeholder="Message (optional e.g. preffered contact time via phone)"  required="required"></textarea>
                </div>
  
                <table className="cart-table bottom">
                  <tbody>
                  <tr>
                    <th>
                      <a className="button color pull-right" onClick={() => doRenderOrderConfirm(true)}>Confirm Orders</a>
                    </th>
                  </tr>
                  </tbody>
                </table>

  
              </form>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

export default cart;