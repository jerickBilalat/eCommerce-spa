import * as api from "../api";
import localCart from "../components/utils/localCart";
import { MODIFY_CART_SUCCEEDED, FLASH_MESSAGE } from "./types";

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
  let updatedCart = localCart.deleteItem(id);
  return modifyCartSucceeded(updatedCart);
}

export function increaseCartItemQuantity(id, differential) {
  let updatedCart = localCart.increaseItemQuantity(id, differential);
  return modifyCartSucceeded(updatedCart);
}

export function decreaseCartItemQuantity(id, differential) {
  let updatedCart = localCart.decreaseItemQuantity(id, differential);
  return modifyCartSucceeded(updatedCart);
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
					const inStockItem = inStock.filter(inStockItem => inStockItem["_id"] === cartItem.id)[0],
						{_id: inStockId, name, price, quantity} = inStockItem;

					if (inStockItem.quantity < cartItem.quantity) {

						localCart.quantitySync(cartItem.id, inStockItem.quantity)
						updatedCart.push({id: inStockId, name, price, quantity});
					} else {
						updatedCart.push({id: inStockId, name, price, quantity: cartItem.quantity});
					}
				} else {
					localCart.deleteItem(cartItem.id);
				}
				});

			return dispatch(modifyCartSucceeded(updatedCart));
      });
    }
  };
}
