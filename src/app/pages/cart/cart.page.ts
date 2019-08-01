import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../../services/cartservice.service';
import { ToastController, AlertController, PickerController, LoadingController } from '@ionic/angular';
import { Http, Headers, RequestOptions } from '@angular/http';

//import { PickerOptions, loadingController } from '@ionic/core';
import { Router } from '@angular/router';
//import { ThrowStmt } from '@angular/compiler';
//import { ConsoleReporter } from 'jasmine';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  public backPages =[
    {url: '/dishslist'}];

  user_id;
  user_name;
 cartItem:any[]= [];
 //cartItems:any[] = []; 
 totalAmount: number = 0;
 //isCartItemLoaded: boolean = false;
 isEmptyCart: boolean = false;
  
  


  constructor( public cartserviceService: CartserviceService,
               public toastController: ToastController,
               public alertController: AlertController,
               private pickerCtrl: PickerController,
               private http: Http,
               public router:Router,
               public loadingController: LoadingController,
               public storage: Storage) {
                this.user_id = JSON.parse(window.localStorage.getItem('userKey'));
                //this.order_cart = JSON.parse(window.localStorage.getItem('order_cartKey'));
                this.user_name = JSON.parse(window.localStorage.getItem('usernameKey'));
                
                }

  
   ngOnInit() {
     this.loadCartItems();
     //this.cartItems = JSON.parse(window.localStorage.getItem('cartItemkey'));
     }


   loadCartItems(){
     
     this.cartserviceService.getCartItems()
     .then((val) => {
       this.cartItem = val;
       if(this.cartItem.length > 0){
         this.cartItem.forEach((v, index) => {
           this.totalAmount += parseInt(v.totalPrice);
           });
       this.isEmptyCart=true;
       }
       else{
        this.isEmptyCart=false;
        }
     })
     .catch(err => {
       console.log(err);
     });
   }


  // async loadCartItems(){
  //    const loading = await loadingController.create({
  //      message: 'wait'
  //    });
  //    loading.present();
  //    this.cartserviceService.getCartItems()
  //    .then((val) => {
  //      this.cartItems = val;
  //      console.log(this.cartItems);
  //      if(this.cartItems.length > 0){
  //        this.cartItems.forEach((v, indx) => {
  //          this.totalAmount += parseInt(v.totalPrice);
  //        });
  //        this.isEmptyCart = false;
  //      }
  //      this.isCartItemLoaded = true;
  //      loading.dismiss();
  //    })
  //    .catch(err => {
  //      console.log(err);
  //    });
  //  }

   removeItem(itm){
     this.cartserviceService.removeFromCart(itm).then(() => {
       this.loadCartItems();
     });
   }

   checkOut(){
     var userId= this.user_id;
     if(userId !==null){
       this.router.navigate(['\checkoutpage']);
     }
     else{
       this.router.navigate(['\login']);
     }
   }


  
  
    
}
