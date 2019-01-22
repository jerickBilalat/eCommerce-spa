import * as api from "../api";
import currency from "currency.js";
import localCart from "../components/utils/localCart";
import { MODIFY_CART_SUCCEEDED, FLASH_MESSAGE } from "./types";

import { toast } from "react-toastify";

// todo: need to include to the cart actions
// maybe even be a generic notification system
function flashMessage(message) {
  return {
    type: FLASH_MESSAGE,
    payload: message
  };
}

////////////////////
// CART ACTIONS
//////////////////////

function modifyCartSucceeded(cart) {
  return {
    type: MODIFY_CART_SUCCEEDED,
    payload: cart
  };
}


export function deleteCartItem(id) {
  localCart.deleteItem(id);
  return {
    type: "DELETE_ITEM",
    payload: id
  }
}

export function increaseCartItemQuantity(productDetails, differential) {
  const {id, name, price} = productDetails
  let updatedCartQuantity = localCart.increaseItemQuantity(id, differential);
  let cartItemValue = getItemValue(price, updatedCartQuantity);
  console.log( typeof cartItemValue )
  debugger
  let updatedItem = { id, name, price, quantity: updatedCartQuantity, value: cartItemValue }
    return {
      type: "MODIFY_ITEM_QNTY",
      payload: updatedItem
  }
}

export function decreaseCartItemQuantity(productDetails, differential) {
  const {id, name, price} = productDetails;
  let updatedCartQuantity = localCart.decreaseItemQuantity(id, differential);
  if(updatedCartQuantity === 0) return deleteCartItem(id);
  let cartItemValue = getItemValue(price, updatedCartQuantity);
  let updatedItem = { id, name, price, quantity: updatedCartQuantity, value: cartItemValue }
  return {
    type: "MODIFY_ITEM_QNTY",
    payload: updatedItem
}
}

function getItemValue(price, quantity) {
  console.log(currency(price).multiply(quantity).value.toString(10));
  return currency(price).multiply(quantity.toString()).format()
}
export function syncCart() {
  return dispatch => {
    let cart = localCart.getCart(),
      	updatedCart = [];

    if (Array.isArray(cart) && cart.length <= 0) {
    	return dispatch(modifyCartSucceeded(cart));
    } else {
      let cartItemIds = cart.map(item => item.id);

      api.fetchMultipleFilteredProducts(cartItemIds).then(res => {
        
        const inStock = res.data,
          inStockIds = inStock.map(item => item["_id"]);

        cart.forEach(cartItem => {
          if (inStockIds.includes(cartItem.id)) {
            const inStockItem = inStock.filter(inStockItem => inStockItem["_id"] === cartItem.id)[0];
            const {_id: inStockId, name, price, quantity} = inStockItem;

            if (inStockItem.quantity < cartItem.quantity) {
              localCart.quantitySync(cartItem.id, inStockItem.quantity)
              updatedCart.push({id: inStockId, name, price, quantity, value: getItemValue(inStockItem.price, inStockItem.quantity)});
            } else {
              updatedCart.push({id: inStockId, name, price, quantity: cartItem.quantity, value: getItemValue(inStockItem.price, cartItem.quantity)});
            }
          } else {
            localCart.deleteItem(cartItem.id);
          }
          });
          toast.info("Cart updated.",{
            position: toast.POSITION.BOTTOM_LEFT
          });
        return dispatch(modifyCartSucceeded(updatedCart));
      });
    }
  };
}
