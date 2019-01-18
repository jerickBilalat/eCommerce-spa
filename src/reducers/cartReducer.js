import {
  MODIFY_CART_SUCCEEDED,
  FLASH_MESSAGE
} from "../actions/types";


const initialState = {
  cartItems: [],
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
      let cartItemIds = state.cartItems.map( item => item.id);
      let updatedCartItems = state.cartItems.map(item => item);
      if(cartItemIds.includes(action.payload.id)) {
        let itemIndex = state.cartItems.map(item => item.id).indexOf(action.payload.id);
        updatedCartItems.splice(itemIndex,1,action.payload);
      }else {
        updatedCartItems.push(action.payload);
      }
      
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
