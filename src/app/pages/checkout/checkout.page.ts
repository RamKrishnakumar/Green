import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../../services/cartservice.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController} from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  public backPages =[
    {url: '/cart'}];

  cartItem: any[]=[];
  productAmt: number = 0;
  total_price: number = 0;
  gstAmount: number = 0;
  gstPercent: number = 0.05;
  customerName : any;
  customerId: any;
  payment_method:any;
  payment_method_name: any;
  user_details: any;
  constructor(public cartserviceService: CartserviceService,
              public http: Http,
              public alertController: AlertController,
              public router: Router) { 
    this.customerId = JSON.parse(window.localStorage.getItem('userKey'));
    this.customerName = JSON.parse(window.localStorage.getItem('usernameKey'));
    this.payment_method = JSON.parse(window.localStorage.getItem('paymethodKey'));
  }

  ngOnInit() {
    this.loadCartItems();
    this.paymentMethod();
    console.log(this.payment_method);
  }
  loadCartItems(){
    this.cartserviceService.getCartItems().then(val => {
      this.cartItem = val;
      if(this.cartItem.length>0){
        this.cartItem.forEach((v, indx) => {
          this.productAmt += parseInt(v.totalPrice);
        });
        this.gstAmount= this.productAmt * this.gstPercent;
        this.total_price= this.productAmt + this.gstAmount;
      }
    }).catch(err => {});
  }

  paymentMethod(){
    if(this.payment_method==1){
      this.payment_method_name = 'Pay with PayPal';
    }
    else if(this.payment_method==2){
      this.payment_method_name = 'Cash On Delivery';
    }
    else if(this.payment_method ==3){
      this.payment_method_name = 'Pay & Pick';
    }
  }

  placeOrder(){
    if(this.payment_method==2 || this.payment_method==3){
      return new Promise((resolve,reject) => {
        
        var headers = new Headers({
              //"Authorization": 'Basic',
              //"username": 'devpankaj',
              //"password": 'devpankaj',
              //"X-API-KEY": '123run',
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
              //'Access-Control-Allow-Methods': 'POST',
              });
            const requestOptions = new RequestOptions({ headers: headers });
            //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
            this.http.get("http://wiesoftware.com/greenchili/apisecure/userDetails/"+this.customerId,requestOptions).subscribe(res => {
             resolve(res.json());
             },(err) => {
              reject(err);
            });
      }).then((result) => {
        this.user_details = result;
        console.log(this.user_details);
        if(this.user_details.data.address == null && this.user_details.data.province == null && this.user_details.data.city == null && this.user_details.data.zipcode == null ){
          this.router.navigate(['\editprofile']);
        }
        else{
          
        }
      }, (err) => {
        
      });;
    }

  }
}
