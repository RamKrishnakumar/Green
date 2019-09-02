import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ToastController, AlertController } from '@ionic/angular';
import 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

//import { ResourceLoader } from '@angular/compiler';

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
              public router: Router,
              public authService: AuthService) { 
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
    this.myOrder();
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

myOrder(){
  if(this.user_id== null){
    this.emptyOrder();
    this.messageError=this.errorMessage;
  }
  else{
    this.authService.myOrders(this.user_id).then((result) => {
      this.order_history = result;
      console.log(this.order_history);
      
      if(this.order_history.status==false){
        this.emptyOrder();
        this.messageError=this.errorMessage;
      }
      else if(this.order_history.status==true){
        this.order_data = this.order_history.data;
        console.log(this.order_data);
      }
    }, (err) => {
      this.apiConnection();
    });;
  }
}


backHome(){
  this.router.navigate(['\home']);
}

}
