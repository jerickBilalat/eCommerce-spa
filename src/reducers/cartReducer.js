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
      return {
        ...state,
        cartItems: action.payload
      }
    case FLASH_MESSAGE:
      return {...state, flashMessage: action.payload}
    default:
      return state;
  }
}
