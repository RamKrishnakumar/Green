import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController } from '@ionic/angular';
import 'rxjs';
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.page.html',
  styleUrls: ['./myorders.page.scss'],
})
export class MyordersPage implements OnInit {
  user_id:any;
  constructor(public http: Http,
              public toastController: ToastController,
              public alertController: AlertController,
              public router: Router) { 
              this.user_id = JSON.parse(window.localStorage.getItem('userKey'));
              console.log(this.user_id);
              }
  
              order_history:any; 
              order_data:any;  
              messageError:any;
  
  public errorMessage=[
    {
     message1:'OOPs!',
      message2:'No Record History Found',
      url:'/home'
    }]
  

  ngOnInit() {
    return new Promise((resolve,reject) => {
      
      
      var headers = new Headers({
            //'X-API-KEY': '123run',
            //"Authorization": 'Basic',
            //'username': 'devpankaj',
            //'password': 'devpankaj',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',                      
          });
          const requestOptions = new RequestOptions({ headers: headers });
          //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
          this.http.get(" http://wiesoftware.com/greenchili/apisecure/order/orderHistory/"+ this.user_id,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
          });
    }).then((result) => {
      this.order_history = result;
      console.log(this.order_history);
      if(this.order_history.status==false){
        this.emptyOrder();
        this.messageError=this.errorMessage;
      }
      else if(this.order_history.status==true){
        this.order_data = this.order_history.data;
      }
    }, (err) => {
      this.apiConnection();
    });;
  }
  async apiConnection() {
    const toast = await this.toastController.create({
      message: 'Connection Failed',
      color: "danger",
      duration: 2000,
      cssClass:"alert-design",
      position:"top"
    });
    toast.present();
  }

  async emptyOrder() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: this.order_history.message,
      buttons: ['OK'],
      cssClass: "toast-design"
    });
  
    await alert.present();
  }

backHome(){
  this.router.navigate(['\home']);
}

}
