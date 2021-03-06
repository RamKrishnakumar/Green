import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


const CART_KEY = 'cartItems';
//const CART_LIST= 'cartList';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {
 theCart: any[] = [];
//  theCartList: any[]=[];
  
  constructor(public storage: Storage) { }

  addtoCart(product){
    return this.getCartItems().then(result => {
      if(result){
        if(!this.containsObject(product,result)) {
          result.push(product);
          return this.storage.set(CART_KEY,result);
        } else {
          let index= result.findIndex(x => x.pro_id == product.pro_id);
          let prevQuantity = parseInt(result[index].qty);
         product.qty = (prevQuantity + product.qty);
         let currentPrice = (parseFloat(product.price) * product.qty);
         product.totalPrice = currentPrice;
         result.splice(index,1);
         result.push(product);
         return this.storage.set(CART_KEY,result);
         }
      } else {
        return this.storage.set(CART_KEY, [product]);
      }
    })
   }
 
  //  removeFromCart(product) {
  //    return this.getCartItems().then(result => {
  //      if (result) {
  //        var productIndex = result.indexOf(product);
  //        result.splice(productIndex, 1);
  //        return this.storage.set(CART_KEY, result);
  //      }
  //    })
  //  }


  removeFromCart(product) {
    return this.getCartItems().then(result => {
    if (result) {
    result.forEach((item, index) => {
    if (item.pro_id === product.pro_id) {
    result.splice(index, 1)
    return this.storage.set(CART_KEY, result);
    }
    })
    }
    })
    }
  
   removeAllCartItems() {
     return this.storage.remove(CART_KEY).then(res => {
       return res;
     });
   }
 
   containsObject(obj, list): boolean {
     if (!list.length) {
       return false;
     }
 
     if (obj == null) {
       return false;
     }
     var i;
     for (i = 0; i < list.length; i++) {
       if (list[i].pro_id == obj.pro_id) {
         return true;
       }
     }
     return false;
   }
 
   getCartItems() {
    return this.storage.get(CART_KEY);
  }

  // cartList(product){
  //   return this.getCartList().then(result => {
  //     if(result){
  //       if(!this.containsObject(product,result)) {
  //         result.push(product);
  //         return this.storage.set(CART_LIST,result);
  //       } else {
  //         let index= result.findIndex(x => x.productid == product.productid);
  //         let prevQuantity = parseInt(result[index].qty);
  //        product.qty = (prevQuantity + product.qty);
  //       //  let currentPrice = (parseInt(product.productprice) * product.qty);
  //       //  product.totalPrice = currentPrice;
  //        result.splice(index,1);
  //        result.push(product);
  //        return this.storage.set(CART_LIST,result);
  //        }
  //     } else {
  //       return this.storage.set(CART_LIST, [product]);
  //     }
  //   })
  // }

  // getCartList(){
  //   return this.storage.get(CART_LIST);
  // }











































  
  // getCart(){
  //   return Promise.resolve(this.theCart);
  // }

  // addItem(product){
  //   this.theCart.push(product);
  //   return this.getCart
  // }

  // removeItem(product_id,price){
  //  let tmpId = '${product_id}';
  //  let tmp = this.theCart.map(x => x.product_id).indexOf(tmpId);
  
  //  if(tmp > -1){
  //    this.theCart.splice(tmp,1);
  //  }
  // }
}
