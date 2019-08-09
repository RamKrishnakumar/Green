import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-location-menu',
  templateUrl: './location-menu.page.html',
  styleUrls: ['./location-menu.page.scss'],
})
export class LocationMenuPage implements OnInit {
  public appPages =[
    {url: '/home'}];

  
  
  all_response:any;
  constructor(
              public router: Router,
              public toastController: ToastController,
              public alertController: AlertController,
              public loadingController: LoadingController,
              public http: Http,
              public authService: AuthService
            ) { 
    this.all_response = JSON.parse(window.localStorage.getItem('key'));
  }
  menuType:any;
  empty:any;
  
  public location_title: any;
  
  ngOnInit() {
  
  this.menuType = this.all_response.location_menu.data;
  
  }
  
  


//----------------------------------------------------------------------------------------------------------------------
  //......................Toast Controller  for showing the response of servie when we hit API...........................
  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'please try after sometime, network error',
      buttons: ['OK'],
      cssClass: "toast-design"
    });
  
    await alert.present();
  
  }
  //......................End...........................................................................................
  
//......................Toast Controller  for showing the response of servie when we hit API...........................
   async falseStatus() {
    const toast = await this.toastController.create({
      message: 'Oops! something went wrong',
      color: "dark",
      duration: 2000, 
      position: "top",
      cssClass: "toast-design"   
    });
    toast.present();
  }
//......................End...........................................................................................
  //----------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
public your_locationid:any;
public menu_id:any;
public menu_response: any;
public set_response: any;
public id_number: any;
public subtract: number;


async dishList1(id:string,location_id:string,title:string){
    const loading= await this.loadingController.create({
      message: 'Please Wait',
      translucent: true,
      spinner:'crescent'
    });
    await loading.present();  
  this.your_locationid=location_id;
      this.menu_id=id;
    this.authService.DishList(location_id,id).then((result) => {
      this.menu_response = result;
      if(this.menu_response.status==false){
        this.falseStatus();
        loading.dismiss();
      }
      else if(this.menu_response.status==true){
        this.id_number=location_id;
        this.subtract=this.id_number-1;
        this.set_response = {"menu_type":title, "menu_list":this.menu_response};
        window.localStorage.setItem('menuKey', JSON.stringify(this.set_response));
        this.router.navigate(['dishslist']);
        loading.dismiss();
      }      
    }, (err) => {
      this.errorAlert();
      loading.dismiss();
    });;
  }

//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
goBack(){  
  this.router.navigate(['home']);
}
 }
