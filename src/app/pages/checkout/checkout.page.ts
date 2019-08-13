import { Component, OnInit } from '@angular/core';
import { CartserviceService } from '../../services/cartservice.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  public backPages =[
    {url: '/cart'}];

  qty;
  array: any[]= [];
  array1: any[]= [];
  array2: any[]= [];
  array3: any[]= [];
  cartItem: any[]=[];
  cartItems: any[]=[];
  productAmt: number = 0;
  total_price: number = 0;
  gstAmount: number = 0;
  gstPercent: number = 0.05;
  customerName : any;
  customerId: any;
  payment_method:any;
  payment_method_name: any;
  user_details: any;
  order_response;
  constructor(public cartserviceService: CartserviceService,
              public http: Http,
              public alertController: AlertController,
              public router: Router,
              private payPal: PayPal,
              public authService: AuthService) { 
    this.customerId = JSON.parse(window.localStorage.getItem('userKey'));
    this.customerName = JSON.parse(window.localStorage.getItem('usernameKey'));
    this.payment_method = JSON.parse(window.localStorage.getItem('paymethodKey'));
  }
  paymentAmount: any;
  currency: string = 'USD';
  currencyIcon: string = '$';
  paypal_success_response:any;

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
     this.authService.UserDetails(this.customerId).then((result) => {
        this.user_details = result;
        console.log(this.user_details);
        if(this.user_details.data.address == null && this.user_details.data.province == null && this.user_details.data.city == null && this.user_details.data.zipcode == null ){
          this.router.navigate(['editprofile']);
        }
        else{
          this.cartserviceService.getCartItems()
          .then((val) => {
            this.cartItem = val;
            var b;
            for(b in this.cartItem){
              this.array[b] = this.cartItem[b].pro_id;
              this.array1[b] = this.cartItem[b].pro_name;
              this.array2[b]= this.cartItem[b].qty;
              this.array3[b]= this.cartItem[b].price;
            }            
            if(this.cartItem.length >0 ){
              let qty = this.cartItems.forEach((v,idx) => {v.pro_id});
              let body = 'payment_method=' + this.payment_method +'&email=' + this.user_details.data.email + '&name=' + this.user_details.data.name + '&contact_no=' + this.user_details.data.contact_no + '&remark=' + this.user_details.data.remark + '&province=' + this.user_details.data.province + '&city=' + this.user_details.data.city + '&zipcode=' + this.user_details.data.zipcode + '&address=' + this.user_details.data.address + '&users_id=' + this.user_details.data.users_id + '&total_price=' + this.total_price + '&pro_id=' + this.array + '&pro_name=' + this.array1 + '&qty=' + this.array2 + '&price=' +this.array3;
              this.authService.PlaceOrder(body).then((result) => {
                this.order_response = result;
                if(this.order_response==true)
               {
                console.log(this.order_response);
                this.cartserviceService.removeAllCartItems().then(val => {
                  return val;
                }).catch(err => {});
                this.router.navigate(['myorders']);
               }                
              }, (err) => {
                console.log('something went wrong in placing your  order!');
              });;
            }        
          })
          .catch(err => {
            console.log(err);
          });
        }
      }, (err) => {
        console.log('get be able to hit get user_details api');
      });;
    }
    else if(this.payment_method==1){
    this.authService.UserDetails(this.customerId).then ( (result) => {
        this.user_details = result;
        console.log(this.user_details);
        if(this.user_details.data.address == null && this.user_details.data.province == null && this.user_details.data.city == null && this.user_details.data.zipcode == null ){
          this.router.navigate(['editprofile']);
        }
        else{
          this.paymentAmount=this.total_price;
          console.log('Pay ??????????????');
          this.payPal.init({PayPalEnvironmentProduction: 'AayI9B0wq9DHQO30eyGkIKl71W6A7pPoKShPVGvSAV9uQz4UBehWUaf0cdP-0qwMV-CVyx3alJTEZhLS',
        PayPalEnvironmentSandbox:'sb-bg17y07629@business.example.com'
      }).then(() => {
        // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
          // Only needed if you get an "Internal Service Error" after PayPal login!
          //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        })).then(() => {
          let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
          this.payPal.renderSinglePaymentUI(payment).then((res) => {
            this.paypal_success_response = this.order_response;
            console.log(this.paypal_success_response);
            // Successfully paid
  
            // Example sandbox response
            //
            // {
            //   "client": {
            //     "environment": "sandbox",
            //     "product_name": "PayPal iOS SDK",
            //     "paypal_sdk_version": "2.16.0",
            //     "platform": "iOS"
            //   },
            //   "response_type": "payment",
            //   "response": {
            //     "id": "PAY-1AB23456CD789012EF34GHIJ",
            //     "state": "approved",
            //     "create_time": "2016-10-03T13:33:33Z",
            //     "intent": "sale"
            //   }
            // }
          }, () => {
            console.error('Error or render dialog closed without being successful');
          });
        }, () => {
          console.error('Error in configuration');
        });
      }, () => {
        console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
      });
          
        }
      }, (err) => {
        console.log(err);
      })
    }


  }
}
