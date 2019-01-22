import {
  MODIFY_CART_SUCCEEDED,
  FLASH_MESSAGE
} from "../actions/types";
import currency from "currency.js";

const initialState = {
  cartItems: [],
  isLoading: false,
  error: null,
  flashMessage: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case MODIFY_CART_SUCCEEDED:
      return {
        ...state,
        cartItems: action.payload
      }
    case "MODIFY_ITEM_QNTY":
      let cartItemIds = state.cartItems.map( item => item.id);
      let updatedCartItems = state.cartItems.map(item => item);
      if(cartItemIds.includes(action.payload.id)) {
        let itemIndex = state.cartItems.map(item => item.id).indexOf(action.payload.id);
        updatedCartItems.splice(itemIndex,1,action.payload);
      }else {
        updatedCartItems.push(action.payload);
      }
      
      return {
        ...state,
        cartItems: updatedCartItems
      }
    case "DELETE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter( item => item.id !== action.payload)
      }
      
    case FLASH_MESSAGE:
      return {...state, flashMessage: action.payload}
    default:
      return state;
  }
}


// Selectors
const reducer = function ( accumulator, currentValue ) {
  let value = currency(accumulator).add(currentValue);
  return value.format();
}
export function getSubTotal(state) {
 return state.cart.cartItems.map( item => item.value.toString()).reduce( reducer, "0");
}

export function getShippingTotal(state){
  return "0";
}

export function getTotal() {
  return 
}