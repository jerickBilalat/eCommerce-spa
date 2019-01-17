import {
  MODIFY_CART_SUCCEEDED,
  FLASH_MESSAGE
} from "../actions/types";


const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  isLoading: false,
  error: null,
  flashMessage: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case MODIFY_CART_SUCCEEDED:
      debugger
      return {
        ...state,
        cartItems: action.payload
      }
    case "MODIFY_ITEM_QNTY":
      let itemIndex = state.cartItems.map(item => item.id).indexOf(action.payload.id);
      let updatedCartItems = state.cartItems.map(item => item);
      updatedCartItems.splice(itemIndex,1,action.payload);
      debugger
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
