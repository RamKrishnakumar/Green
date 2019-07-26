import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Http,Headers, RequestOptions } from '@angular/http';
import { ToastController,AlertController, PopoverController } from '@ionic/angular';
import 'rxjs';

@Component({
  selector: 'app-dishslist',
  templateUrl: './dishslist.page.html',
  styleUrls: ['./dishslist.page.scss'],
})
export class DishslistPage implements OnInit {

  public backPages =[
    {url: '/location-menu'}];
  set_response:any;
  dishData:any;
  
  
  dish_image:any;
  

  constructor(public router:Router,
              public http: Http,
              public toastController: ToastController,
              public alertController: AlertController,
              public popoverController:PopoverController
              ) {
  this.set_response = JSON.parse(window.localStorage.getItem('menuKey'));
  }
  ngOnInit() {
    this.dishData = this.set_response.menu_list.data;
    this.dish_image=this.set_response.menu_list.image_link
  }
 //......................Toast Controller  for showing the response of servie when we hit API...........................
 async presentToast() {
  const toast = await this.toastController.create({
    message: 'Connection Failed',
    color: "danger",
    duration: 2000, 
    position: "top",
    cssClass: "toast-design"   
  });
  toast.present();
}
//......................End...........................................................................................

//----------------------Alert Controllers--------------------------------------------------------------------------------
//.................Invalid Credentials Alert............................................................................
async invalid() {
  const alert = await this.alertController.create({
    header: 'Alert',
    message: this.dish_details.message,
    buttons: ['OK'],
    cssClass: "toast-design"
  });

  await alert.present();
}
//.................Invalid Credentials Alert............................................................................
//----------------------End of Alert Controllers--------------------------------------------------------------------------

dish_details:any;
dish_detail:any;
viewDish(id){
    return new Promise((resolve,reject) => {
      var headers = new Headers({
            //'X-API-KEY': '123run',
            //"Authorization": 'Basic',
            //'username': 'devpankaj',
            //'password': 'devpankaj',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            //'Access-Control-Allow-Methods': 'POST',
            
          });
          const requestOptions = new RequestOptions({ headers: headers });
          //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
          this.http.get("http://greenchili.ca/apisecure/location/locationDishDetails/"+id,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
          });
    }).then((result) => {
      this.dish_details = result;
      if(this.dish_details.status==false){
        this.invalid();
      }
      else if(this.dish_details.status==true){
        window.localStorage.setItem('dishKey', JSON.stringify(this.dish_details));
        this.router.navigate(['\dishview']);
      }
    }, (err) => {
      this.presentToast();
    });;
  }



  
  // goBack(){  
  //   this.router.navigate(['\location-menu']);
  // }
 

}
