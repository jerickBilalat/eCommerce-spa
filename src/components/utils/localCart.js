

function decreaseItemQuantity(id, differential) {
  debugger
  let cart = getCart(),
      updatedCart = [];
  
  if(!cart) throw new Error("Can not read Local Storage cart");

  if (
      (cart.length !== 0) 
      &&
      (cart.map(item => item.id).includes(id))
      &&
      (cart.filter( item => item.id === id)[0].quantity > 0)
  ) {

    debugger
    cart.forEach( item => {
      if (item.id === id) {
        item.quantity += differential;
      }
      if(item.quantity !== 0) {
        updatedCart.push(item)
      }
    });
    
    updateLocalCart(updatedCart);
    return updatedCart;

  }else {
    debugger
    throw new Error("Cart is empty or item is not in cart");
  }
}

function increaseItemQuantity(newItem, differential) {
  debugger
  let cart = getCart();
  if(!cart) throw new Error("Can not read Local Storage cart");

  let updatedCart = [...cart];

  let {_id: newItemID, name, price } = newItem;
  let newCartItemQuantity;
  
  // local cart is empty OR newItem being added is not in local cart
  if (
    updatedCart.length === 0
    || 
    (updatedCart.filter( cartItem => cartItem._id === newItemID).length === 0)
  ) {
    debugger
    updatedCart.push({_id: newItem._id, quantity: differential});
    updateLocalCart(updatedCart);
    return {_id: newItemID, name, price, quantity: differential};
  }else {

    debugger
    updatedCart.forEach( cartItem => {
      if (cartItem._id === newItemID) {
        cartItem.quantity += differential;
        newCartItemQuantity = cartItem.quantity;
      }
    });
    
    updateLocalCart(updatedCart);
    return {_id: newItemID, name, price, quantity: newCartItemQuantity};

  }  
}


function modifyItemQuantity(id, differential) {

  let cart = getCart();
  let updatedCart = [];
  
  // local cart is empty OR item being added is not in local cart
  if ((cart && cart.length <= 0) || 
    (cart.filter( item => item.id === id).length === 0)) {
    debugger
    cart.push({id, quantity: 1});
    updateLocalCart(cart);
    return cart;
  }
  

  debugger

  // push each item in updatedCart if quantity is not zero
  cart.forEach( item => {
    if (item.id === id) {
      debugger
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
  debugger
  let cart = getCart();
  let updatedItem;


  debugger
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
  debugger
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

  debugger
  return items[0].quantity;

}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}


function updateLocalCart(newCart) {
  return localStorage.setItem("cart", JSON.stringify(newCart));
}

export default { decreaseItemQuantity, increaseItemQuantity, quantitySync, modifyItemQuantity, deleteItem, getItemQuantity, getCart };