import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Http,Headers, RequestOptions } from '@angular/http';
import { ToastController,AlertController, PopoverController, LoadingController } from '@ionic/angular';
import 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

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
              public popoverController:PopoverController,
              private authService: AuthService,
              public loadingController: LoadingController
              ) {
  this.set_response = JSON.parse(window.localStorage.getItem('menuKey'));
  }
  ngOnInit() {
    this.dishData = this.set_response.menu_list.data;
    this.dish_image=this.set_response.menu_list.image_link
  }

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

async errorAlert() {
  const alert = await this.alertController.create({
    header: 'Alert',
    message: 'please try after sometime, network error',
    buttons: ['OK'],
    cssClass: "toast-design"
  });

  await alert.present();

}
//.................Invalid Credentials Alert............................................................................
//----------------------End of Alert Controllers--------------------------------------------------------------------------

dish_details:any;
dish_detail:any;
async viewDish(id){
  const loading= await this.loadingController.create({
    message: 'Please Wait',
    translucent: true,
    spinner: "crescent"
  });
  await loading.present();
    this.authService.ViewDish(id).then((result) => {
      this.dish_details = result;
      if(this.dish_details.status==false){
        this.invalid();
        loading.dismiss();
      }
      else if(this.dish_details.status==true){
        window.localStorage.setItem('selectedProduct', JSON.stringify(this.dish_details));
        this.router.navigate(['dishview']);
        loading.dismiss();
      }
    }, (err) => {
      this.errorAlert();
      loading.dismiss();
    });;
  }

  goToCart(){
    this.router.navigate(['cart']);
  }
 

}
