import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../../services/cartservice.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dishview',
  templateUrl: './dishview.page.html',
  styleUrls: ['./dishview.page.scss'],
})
export class DishviewPage implements OnInit {
  public backPages =[
    {url: '/dishslist'}];

    productCount: number = 1;
    user_id:any;
    user_name:any;
    product:any;
    userId:any;
    cartItems: any[]
    hideme:boolean = true;
    unhideme: boolean = false;
    cartData:any;
    restaurent_timing:any;
  
    constructor(public cartserviceService: CartserviceService,
                public alertController: AlertController,
                public router: Router) { }
  
  ngOnInit() {
  this.product= JSON.parse(window.localStorage.getItem('selectedProduct'));
  this.restaurent_timing= this.product.restaurent_time_list;
  this.user_id = JSON.parse(window.localStorage.getItem('userKey'));
  this.user_name = JSON.parse(window.localStorage.getItem('usernameKey'));
  console.log(this.product);
  this.cartserviceService.getCartItems().then((val) => {
  this.cartItems = val;
  })
  
  }

  decreaseProductCount() {
    if (this.productCount > 1) {
      this.productCount--;
    }

  }

  incrementProductCount() {
    this.productCount++;

  }

  async successAdd() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Successfully Added',
      buttons: ['OK'],
      cssClass: "toast-design"
    });
  
    await alert.present();
  }
  
  ionviewDidLoad(){
   
  }

  addToCart(){
    var productPrice = this.productCount * parseInt(this.product.data.main_price);
    let cartProduct = {
      pro_id: this.product.data.id,
      pro_name: this.product.data.title,
      thumb: this.product.image_link+this.product.data.image,
      qty: this.productCount,
      price: this.product.data.main_price,
      totalPrice:productPrice,
      userId: this.user_id,
      userName: this.user_name,
    }
    this.cartserviceService.addtoCart(cartProduct).then((val) => {
      this.successAdd();
      this.hideme= false;
      this.unhideme = true;
    });
  }


  // addToCart(product){
  //   this.userId= this.user_id;
  //   if(this.userId !== null ){
  //   let total_price = this.productCount * Number(this.dish_details_response.data.main_price); 
  //   this.cartData = {
  //     'product_id': this.product.id,
  //     'product_title': this.dish_details_response.data.title,
  //     'user_id': this.user_id,
  //     'user_name': this.user_name,
  //     'price':this.dish_details_response.data.main_price,
  //     'discount_price': this.dish_details_response.data.discount_price,
  //     'image': this.dish_details_response.image_link+this.dish_details_response.data.image,
  //     'count': this.productCount,
  //     'total_price':total_price
  //   }
  //   this.cartserviceService.addItem(this.product);
  //   this.successAdd();
  //   this.hideme = false;
  //   this.unhideme = true;

  // }
  // else{
  //   //this.userNotRegistered();
  // console.log('user is not registered');
  // }

  //}

  viewCart(){
    this.router.navigate(['cart']);
  }

}
