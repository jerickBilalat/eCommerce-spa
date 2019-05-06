import * as api from "../api";
import currency from "currency.js";
import localCart from "../components/utils/localCart";
import { MODIFY_CART_SUCCEEDED, FLASH_MESSAGE } from "./types";

import { toast } from "react-toastify";

export function flashMessage(message) {
  return {
    type: FLASH_MESSAGE,
    payload: message
  };
}

function modifyCartSucceeded(cart) {
  return {
    type: MODIFY_CART_SUCCEEDED,
    payload: cart
  };
}

export function clearCart() {
  localCart.clearCart();
  return modifyCartSucceeded([]);
}
export function deleteCartItem(id) {
  localCart.deleteItem(id);
  toast.success("Item removed from cart");
  return {
    type: "DELETE_ITEM",
    payload: id
  }
}



export function increaseCartItemQuantity(productDetails, differential) {
  const {id, name, price} = productDetails
  let updatedCartQuantity = localCart.increaseItemQuantity(id, differential);
  let cartItemValue = getItemValue(price, updatedCartQuantity);
  let updatedItem = { id, name, price, quantity: updatedCartQuantity, value: cartItemValue }
  if(updatedCartQuantity > 1) {
    toast.success("Item quantity increased");
  }else {
    toast.success("Item added to cart");
  }
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
  toast.success("Item quantity decreased");
  return {
    type: "MODIFY_ITEM_QNTY",
    payload: updatedItem
}
}

// to do: utilty function, refactor to a module
function getItemValue(price, quantity) {
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
        
        let flashMessageTexts = [];

        cart.forEach(cartItem => {
          if (inStockIds.includes(cartItem.id)) {
            const inStockItem = inStock.filter(inStockItem => inStockItem["_id"] === cartItem.id)[0];
            const {_id: inStockId, name, price, quantity} = inStockItem;

            if (inStockItem.quantity < cartItem.quantity) {
              localCart.quantitySync(cartItem.id, inStockItem.quantity)
              flashMessageTexts.push(`${inStockItem.name} has ${inStockItem.quantity} in stock`)
              updatedCart.push({id: inStockId, name, price, quantity, value: getItemValue(inStockItem.price, inStockItem.quantity)});
            } else {
              dispatch(flashMessage(null));
              updatedCart.push({id: inStockId, name, price, quantity: cartItem.quantity, value: getItemValue(inStockItem.price, cartItem.quantity)});
            }
          } else {
            flashMessageTexts.push(`Our product with an ID of ${cartItem.id} is out of stock`);
            localCart.deleteItem(cartItem.id);
          }
          });
         
          if(flashMessageTexts.length) {
            toast.warn("Cart is modified.",{
              position: toast.POSITION.BOTTOM_LEFT
            });
            dispatch(flashMessage({status: "notice", title: "Cart is modified", texts: flashMessageTexts}));
          }
        return dispatch(modifyCartSucceeded(updatedCart));
      });
    }
  };
}
