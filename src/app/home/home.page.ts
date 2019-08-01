import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ToastController, AlertController} from '@ionic/angular';
import {Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs'



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user_id:any;
  user_details:any;
  constructor(public router:Router,
              public toastController: ToastController,
              public alertController: AlertController,
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
    
    
  }

  //----------------------------------------------------------------------------------------------------------------------
  //......................Toast Controller  for showing the response of servie when we hit API...........................
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Failed to get api response',
      color: "danger",
      duration: 2000, 
      position: "top",
      cssClass: "toast-design"   
    });
    toast.present();
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
    this.router.navigate(['\login']);
  }
  public aveswgreen_response:any;
  public all_response:any;
  
  aveswGreen(){
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
          
          this.http.get("http://greenchili.ca/apisecure/location/locationMenu/1",requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
            this.presentToast();
          });
    }).then((result) => {
      this.aveswgreen_response = result;
      if(this.aveswgreen_response.status==false){
        this.falseStatus();
      }
      else if(this.aveswgreen_response.status==true){
        
        this.all_response= {"location": this.location_response.data[0],"location_menu":this.aveswgreen_response};
        window.localStorage.setItem('key', JSON.stringify(this.all_response));
        this.router.navigate(['\location-menu']);
      }
    }, (err) => {
      this.presentToast();
    });;
  }

  waldenGreen(){
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
          
          this.http.get("http://greenchili.ca/apisecure/location/locationMenu/2",requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
            this.presentToast();
          });
    }).then((result) => {
      this.aveswgreen_response = result;
      if(this.aveswgreen_response.status==false){
        this.falseStatus();
      }
      else if(this.aveswgreen_response.status==true){
        
        this.all_response= {"location": this.location_response.data[1],"location_menu":this.aveswgreen_response};
        window.localStorage.setItem('key', JSON.stringify(this.all_response));
        this.router.navigate(['\location-menu']);
      }
    }, (err) => {
      this.presentToast();
    });;
  }

  crowchildGreen(){
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
          
          this.http.get("http://greenchili.ca/apisecure/location/locationMenu/3",requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
            this.presentToast();
          });
    }).then((result) => {
      this.aveswgreen_response = result;
      if(this.aveswgreen_response.status==false){
        this.falseStatus();
      }
      else if(this.aveswgreen_response.status==true){
        
        this.all_response= {"location": this.location_response.data[2],"location_menu":this.aveswgreen_response};
        window.localStorage.setItem('key', JSON.stringify(this.all_response));
        this.router.navigate(['\location-menu']);
      }
    }, (err) => {
      this.presentToast();
    });;
  }

  crowfootGreen(){
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
          
          this.http.get("http://greenchili.ca/apisecure/location/locationMenu/4",requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
            this.presentToast();
          });
    }).then((result) => {
      this.aveswgreen_response = result;
      if(this.aveswgreen_response.status==false){
        this.falseStatus();
      }
      else if(this.aveswgreen_response.status==true){
        
        this.all_response= {"location": this.location_response.data[3],"location_menu":this.aveswgreen_response};
        window.localStorage.setItem('key', JSON.stringify(this.all_response));
        this.router.navigate(['\location-menu']);
      }
    }, (err) => {
      this.presentToast();
    });;
  }

  nolanGreen(){
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
          
          this.http.get("http://greenchili.ca/apisecure/location/locationMenu/5",requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
            this.presentToast();
          });
    }).then((result) => {
      this.aveswgreen_response = result;
      if(this.aveswgreen_response.status==false){
        this.falseStatus();
      }
      else if(this.aveswgreen_response.status==true){
        
        this.all_response= {"location": this.location_response.data[4],"location_menu":this.aveswgreen_response};
        window.localStorage.setItem('key', JSON.stringify(this.all_response));
        this.router.navigate(['\location-menu']);
      }
    }, (err) => {
      this.presentToast();
    });;
  }

  locationData(){
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
          this.http.get("http://greenchili.ca/apisecure/location/locations/",requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
            this.presentToast();
          });
    }).then((result) => {
      this.location_response = result;
      console.log(this.location_response);
    }, (err) => {
      this.presentToast();
    });;
  }
  user_name:any;
  userDetails(){
    //your_user_id;
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
          this.http.get("http://wiesoftware.com/greenchili/apisecure/userDetails/"+this.user_id,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
            this.presentToast();
          });
    }).then((result) => {
      this.user_details= result;
      console.log(this.user_details);
      if(this.user_details.status==false)
      {
       console.log('no user logged in');  
      }
      else if(this.user_details.status==true){
    this.user_name=this.user_details.data.name;
    window.localStorage.setItem('usernameKey', JSON.stringify(this.user_name));    
    }

    }, (err) => {
      this.presentToast();
    });;
  }
  async invalid() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: this.user_details.message,
      buttons: ['OK'],
      cssClass: "toast-design"
    });
  
    await alert.present();
  }
  //.................Invalid Credentials Alert............................................................................
  //----------------------End of Alert Controllers--------------------------------------------------------------------------------
  
}
