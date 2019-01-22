import axios from "axios";
import localCart from "../components/utils/localCart";

const API_BASE_URL = "http://localhost:3002";

const client = axios.create({
  baseURL: API_BASE_URL
})

export function fetchProducts(queryStatements) {
  return client.post('/api/product/shop', queryStatements)
}

export function fetchSingleFilteredProduct(id){
  return client.get(`api/product/articles_by_id?id=${id}&type=single`)
}

export function fetchMultipleFilteredProducts(ids) {
  return client.get(`api/product/articles_by_id?id=${ids}&type=array`)
}






















////////////////////////////
// OLD CODE - use only for reference
//////////////////////////
// old code logic transfered to syncCart action creator
export function modifyItemQuantity(id, differentialAmount ) {
  // fetch item
    return client.get(`api/product/articles_by_id?id=${id}&type=single`)
      .then(
        resp => {
          
          const product = resp.data[0];
          const productInStockQuantity = product.quantity,
                productId = product._id;
          let updatedCart;
          
          // todo: if product does not exist, this is more for the api refactoring, should be handled in the catch block

          const localItemQuantity = localCart.getItemQuantity(id);
          
          if(productInStockQuantity > localItemQuantity ) {
            updatedCart = localCart.modifyItemQuantity(productId, differentialAmount);
            return {
              isAddSuccess: true,
              message: `${id} added to cart`,
              cart: updatedCart
            }
          }else if(productInStockQuantity < localItemQuantity) {
            let cart;
            let message = `Can only purchase a limited in stock quantity of ${productInStockQuantity}. The quantity of  in your cart is now equal to ${productInStockQuantity}`;
            localCart.quantitySync(productInStockQuantity);
            cart = localCart.getLocalStorageCart();
            return {
              cart, 
              isAddSuccess: false,
              message
            }
          }else {
            // notify user product has only have limited in stock
            // update product availabity in store for affected comps i.g. productCard and productDetail
            let message = `Can only purchase a limited in strock quantity of ${productInStockQuantity}`;
            console.log(message);
            return {
              isAddSuccess: false,
              message
            }
          }
        }
      )
      .catch(err => console.error(err));
}

// old code logic transfered to syncCart action creator
export function fetchCart() {

  let updatedCart = [];

  let cart = localCart.getLocalStorageCart();
  // base case: if local cart is empty
  if (cart.length <= 0) {
    return {
      cart: []
    }
  }

  let cartItemIds = cart.map(item => item.id)

  return client.get(`api/product/articles_by_id?id=${cartItemIds}&type=array`)
    .then( res => {
      let inStock = res.data;
      let inStockIds = inStock.map(item => item["_id"]);

      // for each cartItemIds
        // if item in stock
          // compare quantity wanted vs have
            //if wanted > have
              // updated wanted to equal to have
              // add item to updated cart
            // else, means equal or less
              // add item to updated cart

      // data structure
      // inStock [{_id: sdlfsjdksdjfls, quantity: 1}]
      // cart [{id: lsdjflsdfj, quantity: 1}]

      cart.forEach( item => {
        if(inStockIds.includes(item.id)) {
          let availableItem = inStock.filter( inStockItem => inStockItem["_id"] === item.id )[0];
        
          if(availableItem.quantity < item.quantity){
            updatedCart.push(localCart.quantitySync(item.id, availableItem.quantity))
          }else {
            updatedCart.push(item)
          }

        }else {
          localCart.deleteItem(item.id);
        }

      });
      
      return {
        cart: updatedCart
      }
    })
 
  
  

}