import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../../services/cartservice.service';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { CheckoutPage } from '../checkout/checkout.page';

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
    {url: '/home'}];


  //Get value on ionChange on IonRadioGroup
  //selectedRadioGroup:any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem:any;

  radio_list = [
    {
      id: '1',
      name: 'PayPal',
      value: '1',
      text: 'PayPal',
      disabled: false,
      checked: false,
      color: 'limegreen',      
    }, {
      id: '2',
      name: 'cod',
      value: '2',
      text: 'COD',
      disabled: false,
      checked: false,
      color: 'limegreen',
    }, {
      id: '3',
      name: 'pay_and_pick',
      value: '3',
      text: 'Pay & Pick',
      disabled: false,
      checked: false,
      color: 'limegreen'
    },
  ];


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
               public router:Router,
               public loadingController: LoadingController,
               public storage: Storage,) {
                this.user_id = JSON.parse(window.localStorage.getItem('userKey'));
                
                this.user_name = JSON.parse(window.localStorage.getItem('usernameKey'));
                //this.order_cart = JSON.parse(window.localStorage.getItem('order_cartKey'));
                
                }

  
   ngOnInit() {
     this.loadCartItems();
     //console.log(this.user_name);
     }

     radioSelect(event) {
      this.selectedRadioItem = event.detail.value;
      console.log(this.selectedRadioItem);
      window.localStorage.setItem('paymethodKey', JSON.stringify(this.selectedRadioItem));
    }


   async loadCartItems(){
     const loading = await this.loadingController.create({
       message: 'Please Wait',
       translucent: true,
       spinner: "bubbles"
     });
     await loading.present();
     this.cartserviceService.getCartItems()
     .then((val) => {
       this.cartItem = val;
       console.log(this.cartItem);
       if(this.cartItem.length > 0){
         this.cartItem.forEach((v, index) => {
           //this.totalAmount -= this.totalAmount;
           this.totalAmount += parseInt(v.totalPrice);
           });
       this.isEmptyCart=true;
       loading.dismiss();
       }
       else{
        this.isEmptyCart=false;
        loading.dismiss();
        }
     })
     .catch(err => {
       console.log(err);
       loading.dismiss();
     });
   }

   async removeItem(itm){
     const loading = await this.loadingController.create({
       message:'deleting',
       translucent: true,
       spinner: "bubbles"
     });
     await loading.present();
     this.cartserviceService.removeFromCart(itm).then(() => {
       this.loadCartItems();
       this.totalAmount -= this.totalAmount;
       loading.dismiss();
       
     });
   }

   async checkOut(){
     const loading= await this.loadingController.create({
       message:'Please Wait',
       translucent: true,
       spinner: "crescent"
     });
     await loading.present();
     var userId= this.user_id;
     if(userId !==null){
       this.router.navigate(['checkout']);
       console.log(this.selectedRadioItem);
       loading.dismiss();
     }
     else{
       this.router.navigate(['login']);
       loading.dismiss();
     }
   }



  
  
    
}
