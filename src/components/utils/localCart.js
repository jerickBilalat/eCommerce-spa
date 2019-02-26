/* NOTE: localStorage Browser Compatibility
localStorage my not be present in all browsers. Go to https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Local_storage for a polyfill or google other alternatives.
*/

function clearCart(){
  localStorage.setItem("cart", "[]");
}

function decreaseItemQuantity(id, differential) {
  let cart = getCart(),
      updatedCart = [],
      newCartItemQuantity;

  if (
      (cart.length !== 0) 
      &&
      (cart.map(item => item.id).includes(id))
      &&
      (cart.filter( item => item.id === id)[0].quantity > 0)
  ) {

    cart.forEach( item => {
      if (item.id === id) {
        item.quantity += differential;
        newCartItemQuantity = item.quantity;
        if(newCartItemQuantity !== 0) {
          updatedCart.push(item)
        }
      } else {
        updatedCart.push(item);
      }
    });
    
    updateLocalCart(updatedCart);
    return newCartItemQuantity;

  }else {
    throw new Error("Cart is empty or item is not in cart");
  }
}

function increaseItemQuantity(id, differential) {
  const cart = getCart();

  let updatedCart = [...cart],
      newCartItemQuantity;
  
  // local cart is empty OR newItem being added is not in local cart
  if (
    updatedCart.length === 0
    || 
    (updatedCart.filter( cartItem => cartItem.id === id).length === 0)
  ) {
    updatedCart.push({id, quantity: differential});
    updateLocalCart(updatedCart);
    newCartItemQuantity = differential;
    return newCartItemQuantity;
  }else {

    updatedCart.forEach( cartItem => {
      if (cartItem.id === id) {
        cartItem.quantity += differential;
        newCartItemQuantity = cartItem.quantity;
      }
    });
    
    updateLocalCart(updatedCart);
    return newCartItemQuantity;

  }  
}


function modifyItemQuantity(id, differential) {

  let cart = getCart();
  let updatedCart = [];
  
  // local cart is empty OR item being added is not in local cart
  if ((cart && cart.length <= 0) || 
    (cart.filter( item => item.id === id).length === 0)) {
    cart.push({id, quantity: 1});
    updateLocalCart(cart);
    return cart;
  }
  
  // push each item in updatedCart if quantity is not zero
  cart.forEach( item => {
    if (item.id === id) {
      item.quantity += differential;
      if(item.quantity !== 0) {
        updatedCart.push(item);
      }
    }else {
      updatedCart.push(item)
    }
  });
  
  updateLocalCart(updatedCart);
  return updatedCart;
}

function quantitySync(id, int) {
  let cart = getCart();
  let updatedItem;

  cart = cart.map(item => {

    if (item.id === id) {
      item.quantity = int;
      updatedItem = item;
      return item;
    }

    return item;
  });
  
  updateLocalCart(cart);
  return updatedItem;
}


function deleteItem(id) {
  let cart = getCart();

  cart = cart.filter(item => item.id !== id);
  updateLocalCart(cart);
  return cart;

}

function getItemQuantity(id){
  const cart = getCart();
  let items;
  
  if(cart.length === 0) return 0;
  
  items = cart.filter(item => item.id === id);

  if(items.length === 0) return 0;

  return items[0].quantity;

}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}


function updateLocalCart(newCart) {
  return localStorage.setItem("cart", JSON.stringify(newCart));
}

export default { decreaseItemQuantity, increaseItemQuantity, quantitySync, modifyItemQuantity, deleteItem, getItemQuantity, getCart, clearCart };