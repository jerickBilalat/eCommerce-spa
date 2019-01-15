import axios from "axios";
import { PRODUCT_SERVER } from './misc';


function fetchItem(id) {
  return axios
    .get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then(response=>{
        return response.data
    })
    .catch(err => {
        console.error(err);
    });
}

function fetchCart(cartIds) {
  
  return axios
    .get(
      `${PRODUCT_SERVER}/articles_by_id?id=${cartIds.toString()}&type=array`
    )
    .then(response => {
      return response.data;
    });
}

async function changeItemQuantity(id, amount) {
  // get local storage cart
  let cart = getLocalStorageCart();

  const cartItem = await fetchItem(id);

  // modify item
  if (cart && cart.length < 0) {
    cart.push({ ...cartItem, quantity: 1 })
  } else {
    cart = cart.map(item => {
      if (item._id === cartItem._id) {
        item.quantity += amount;
        return item;
      }
      return item;
    });
  }

  updateCart(cart);
  return cart;
}

async function getCart() {

  //get localcart
  let cart = getLocalStorageCart();
  
  // fetch server
  if (cart && cart.length > 0) {
    let localCartIds = cart.map(item => item._id);
    cart = await fetchCart(localCartIds);
  }
  
  // update local storage cart
  updateCart(cart);
  return cart;
}

function deleteItem(id) {
  //get localcart
  let cart = getLocalStorageCart();

  // filter
  let itemIds = cart
    .filter(item => item._id !== id)
    .map(item => item._id);

  // fetch
  cart = fetchCart(itemIds);
      
  updateCart(cart);   
  return cart;

}


function updateCart(updatedCart) {
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}
function getLocalStorageCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

const cartData = { changeItemQuantity, getCart, deleteItem };
export default cartData;