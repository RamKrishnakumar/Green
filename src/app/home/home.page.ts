import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ToastController, AlertController, LoadingController} from '@ionic/angular';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs'
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  location_id1: number=1;
  location_id2: number=2;
  location_id3: number=3;
  location_id4: number=4;
  location_id5: number=5;
  user_id:any;
  user_details:any;
  constructor(public router:Router,
              public toastController: ToastController,
              public alertController: AlertController,
              public authService: AuthService,
              public loadingController: LoadingController,
              public http: Http) {
  
  //this.user_id = JSON.parse(window.localStorage.getItem('userKey'));
  //console.log(this.user_id);
    
  }
  location_response:any;
  ngOnInit(){
    //window.localStorage.clear();
    this.user_id = JSON.parse(window.localStorage.getItem('userKey'));
    console.log(this.user_id);
    this.locationData();
    this.userDetails();
    console.log(this.location_response);
    console.log(this.location_id1);
    
    
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

  async usernotLogin() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'No user Logged in!',
      message: 'Login First!',
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

  logout(){
    this.router.navigate(['login']);
  }
  public aveswgreen_response:any;
  public all_response:any;
  
  async aveswGreen(){
    const loading = await this.loadingController.create({
      message: 'Please Wait',
      translucent: true,
      spinner: "crescent"
    });
    await loading.present();
    this.authService.LocationList(this.location_id1).then((result) => {
      this.aveswgreen_response = result;
      if(this.aveswgreen_response.status==false){
        this.falseStatus();
        loading.dismiss();
      }
      else if(this.aveswgreen_response.status==true){
        
        this.all_response= {"location": this.location_response.data[0],"location_menu":this.aveswgreen_response};
        window.localStorage.setItem('key', JSON.stringify(this.all_response));
        this.router.navigate(['location-menu']);
        loading.dismiss();
      }
    }, (err) => {
      this.errorAlert();
      loading.dismiss();
    });;
  }

  async waldenGreen(){
    const loading = await this.loadingController.create({
      message: 'Please Wait',
      translucent: true,
      spinner: "crescent"
    })
    await loading.present();
    this.authService.LocationList(this.location_id2).then((result) => {
      this.aveswgreen_response = result;
      if(this.aveswgreen_response.status==false){
        this.falseStatus();
        loading.dismiss();
      }
      else if(this.aveswgreen_response.status==true){
        
        this.all_response= {"location": this.location_response.data[1],"location_menu":this.aveswgreen_response};
        window.localStorage.setItem('key', JSON.stringify(this.all_response));
        loading.dismiss();
        this.router.navigate(['location-menu']);
      }
    }, (err) => {
      this.errorAlert();
      loading.dismiss();
    });;
  }

  async crowchildGreen(){
    const loading = await this.loadingController.create({
      message: 'Please Wait',
      translucent: true,
      spinner: "crescent"
    });
    await loading.present();
    this.authService.LocationList(this.location_id3).then((result) => {
      this.aveswgreen_response = result;
      if(this.aveswgreen_response.status==false){
        loading.dismiss();
        this.falseStatus();
      }
      else if(this.aveswgreen_response.status==true){
        
        this.all_response= {"location": this.location_response.data[2],"location_menu":this.aveswgreen_response};
        window.localStorage.setItem('key', JSON.stringify(this.all_response));
        this.router.navigate(['location-menu']);
        loading.dismiss();
      }
    }, (err) => {
      this.errorAlert();
      loading.dismiss();
    });;
  }

  async crowfootGreen(){
    const loading= await this.loadingController.create({
      message: 'Please wait',
      translucent: true,
      spinner: "crescent"
    });
    await loading.present();
    this.authService.LocationList(this.location_id4).then((result) => {
      this.aveswgreen_response = result;
      if(this.aveswgreen_response.status==false){
        this.falseStatus();
        loading.dismiss();
      }
      else if(this.aveswgreen_response.status==true){
        
        this.all_response= {"location": this.location_response.data[3],"location_menu":this.aveswgreen_response};
        window.localStorage.setItem('key', JSON.stringify(this.all_response));
        this.router.navigate(['location-menu']);
        loading.dismiss();
      }
    }, (err) => {
      this.errorAlert();
      loading.dismiss();
    });;
  }

  async nolanGreen(){
    const loading= await this.loadingController.create({
      message: 'Please Wait',
      translucent: true,
      spinner: "crescent"
    });
    await loading.present();
   this.authService.LocationList(this.location_id5).then((result) => {
      this.aveswgreen_response = result;
      if(this.aveswgreen_response.status==false){
        this.falseStatus();
        loading.dismiss();
      }
      else if(this.aveswgreen_response.status==true){
        
        this.all_response= {"location": this.location_response.data[4],"location_menu":this.aveswgreen_response};
        window.localStorage.setItem('key', JSON.stringify(this.all_response));
        this.router.navigate(['location-menu']);
        loading.dismiss();
      }
    }, (err) => {
      this.errorAlert();
      loading.dismiss();
    });;
  }

  async locationData(){
    const loading = await this.loadingController.create({
      message: 'Please Wait',
      translucent: true,
      spinner: "bubbles"
    });
  await loading.present();
    this.authService.LocationData().then((result) => {
      this.location_response = result;
      loading.dismiss();
      window.localStorage.setItem('locationKey',JSON.stringify(this.location_response));
    }, (err) => {
      this.errorAlert();
      loading.dismiss();
    });;
  }
 
  

  user_name:any;
  async userDetails(){
    const loading = await this.loadingController.create({
      message: 'Please Wait',
      translucent: true,
      spinner: "bubbles"
    });
    await loading.present();
    this.authService.UserDetails(this.user_id).then((result) => {
      this.user_details= result;
      if(this.user_details.status==false)
      {
       this.usernotLogin();
       loading.dismiss();
      }
      else if(this.user_details.status==true){
    this.user_name=this.user_details.data.name;
    window.localStorage.setItem('usernameKey', JSON.stringify(this.user_name));    
    loading.dismiss();
    }

    }, (err) => {
      this.errorAlert();
      loading.dismiss();
    });;
  }
  async invalid() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'no user details found',
      buttons: ['OK'],
      cssClass: "toast-design"
    });
  
    await alert.present();
  }
  //.................Invalid Credentials Alert............................................................................
  //----------------------End of Alert Controllers--------------------------------------------------------------------------------
  
}
