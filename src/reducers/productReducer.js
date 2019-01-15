import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  ADD_BRAND,
  GET_WOODS,
  ADD_WOOD,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL,
  FETCH_PRODUCTS_FAILED,
  FETCH_PRODUCTS_SUCCEEDED,
  FETCH_PRODUCTS_STARTED,
  FLASH_MESSAGE
} from "../actions/types";


const initialState = {
  toShop: [],
  toShopSize: 0,
  isLoading: false,
  error: null,
  flashMessage: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_STARTED:
       
      return {
        ...state,
        isLoading: true
      }
    case FETCH_PRODUCTS_SUCCEEDED:
        
    return {
        ...state,
        toShop: action.payload.products,
        toShopSize: action.payload.size,
        isLoading: false
      }
    case FETCH_PRODUCTS_FAILED:
      return {
        ...state,
        error: action.payload.error
      }
    case FLASH_MESSAGE:
      return {...state, flashMessage: action.payload}
    case GET_PRODUCTS_BY_SELL:
      return { ...state, bySell: action.payload };
    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload };
    case GET_BRANDS:
      return { ...state, brands: action.payload };
    case ADD_BRAND:
      return {
        ...state,
        addBrand: action.payload.success,
        brands: action.payload.brands
      };
    case GET_WOODS:
      return { ...state, woods: action.payload };
    case ADD_WOOD:
      return {
        ...state,
        addWood: action.payload.success,
        woods: action.payload.woods
      };
    case GET_PRODUCTS_TO_SHOP:
      return {
        ...state,
        toShop: action.payload.articles,
        toShopSize: action.payload.size
      };
    case ADD_PRODUCT:
      return { ...state, addProduct: action.payload };
    case CLEAR_PRODUCT:
      return { ...state, addProduct: action.payload };
    case GET_PRODUCT_DETAIL:
      return { ...state, prodDetail: action.payload };
    case CLEAR_PRODUCT_DETAIL:
      return { ...state, prodDetail: action.payload };
    default:
      return state;
  }
}
