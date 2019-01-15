import * as api from '../api';
import localCart from "../components/utils/localCart";
import {
  MODIFY_CART_SUCCEEDED,
  FLASH_MESSAGE
} from './types';

// todo: need to include to the cart actions
// maybe even be a generic notification system
function flashMessage(message) {
    
    return {
        type: FLASH_MESSAGE,
        payload: message
    }
}

////////////////////
// CART ACTIONS
//////////////////////

function modifyCartSucceeded(cart) {
  return {
      type: MODIFY_CART_SUCCEEDED,
      payload: cart
  }
}

function increaseCartItemQuantitySucceeded(cartItem){
    debugger
    return {
        type: "INC_ITEM_QNTY",
        payload: cartItem
    }
}

export function deleteCartItem(id) {
  let updatedCart = localCart.deleteItem(id);
    return modifyCartSucceeded(updatedCart);
}

export function increaseCartItemQuantity(item, differential) {
  
  let updatedItem = localCart.increaseItemQuantity(item, differential);
    return increaseCartItemQuantitySucceeded(updatedItem);
}

export function decreaseCartItemQuantity(id, differential) {
  
  let updatedCart = localCart.decreaseItemQuantity(id, differential);
    return modifyCartSucceeded(updatedCart);
}

export function syncCart() {
  return dispatch => {

      let cart = localCart.getCart(),
          updatedCart = [];

      if ( Array.isArray(cart) && cart.length <= 0) {
          return dispatch(modifyCartSucceeded(cart));
      }else {

          let cartItemIds = cart.map(item => item.id);

          api.fetchMultipleFilteredProducts(cartItemIds)
              .then( res => {
                  let inStock = res.data,
                      inStockIds = inStock.map(item => item["_id"]);

                  cart.forEach( cartItem => {

                      if(inStockIds.includes(cartItem.id)) {
                          let inStockItem = inStock.filter( inStockItem => inStockItem["_id"] === cartItem.id )[0];
                      
                          if(inStockItem.quantity < cartItem.quantity){
                            console.log(inStockItem)
                            updatedCart.push(localCart.quantitySync(cartItem.id, inStockItem.quantity))
                          }else {
                              console.log(inStockItem);
                              updatedCart.push(cartItem)
                          }
                      }else {
                          localCart.deleteItem(cartItem.id);
                      }
                      
                  });

              return dispatch(modifyCartSucceeded(updatedCart));
              
          })

      }
  }
}