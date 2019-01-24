import React from 'react';
import {Link} from "react-router-dom";
import CartCard from "./cartCard";
import TextInput from "../common/textInput";


class Cart extends React.Component {
  // formIsValid() {
  //   let formIsValid = true;
  //   let errors = {};

  //   if (this.state.course.title.length < 5) {
  //     errors.title = 'Title must be at least 5 characters.';
  //     formIsValid = false;
  //   }

  //   this.setState({errors: errors});
  //   return formIsValid;
  // }
  // submitForm(event) {
  //   event.preventDefault();

  //   // if (!this.courseFormIsValid()) {
  //   //   return;
  //   // }

  //   this.props.doRenderOrderConfirm();
  // }

  render() {

    let {
      cartItems,
      formFields,
      updateFormState,
      formErrors,
      subTotal,
      total,
      shippingTotal,
      submitForm,
      deleteCartItem,
      increaseQuantity,
      decreaseQuantity } = this.props;

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

                {cartItems.length ? (
                  cartItems.map(item => (
                    <CartCard 
                      key={item.id} 
                      {...item}
                      deleteCartItem={deleteCartItem}
                      increaseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity}
                    />
                  ))
                ) : (
                  <tr><td>No items in cart. Click <Link to="/shop" >Here</Link> to browse our products</td></tr>
                )}
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
                  <td><strong>${subTotal}</strong></td>
                </tr>
    
                <tr>
                  <th>Shipping and Handling</th>
                  <td>${shippingTotal}</td>
                </tr>
    
                <tr>
                  <th>Order Total</th>
                  <td><strong>${total}</strong></td>
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
                        <TextInput 
                          name="name" 
                          placeholder="Full name" 
                          onChange={updateFormState} 
                          value={formFields.name} 
                          error={formErrors.name}
                        />
                      </div>
                      
                      <div>
                        <TextInput 
                          name="email"
                          placeholder="Email"
                          onChange={updateFormState}
                          value={formFields.email}
                          error={formErrors.email}
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div>
                        <TextInput 
                          name="phone"
                          placeholder="Phone number (optional)"
                          onChange={updateFormState}
                          value={formFields.phone}
                          error={formErrors.phone}
                        />
                      </div>
                    </div>
                  </div>
    
                  <div>
                    <TextInput 
                      name="message"
                      placeholder="Message (optional e.g. preffered contact time via phone)"
                      onChange={updateFormState}
                      value={formFields.message}
                      error={formErrors.message}
                    />
                  </div>
    
                  <table className="cart-table bottom">
                    <tbody>
                    <tr>
                      <th>
                        <button className="button color pull-right" onClick={(e) => submitForm(e)}>Confirm Orders</button>
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
  }
}
export default Cart;