import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs';


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
              public http: Http,
            ) { 
    this.all_response = JSON.parse(window.localStorage.getItem('key'));
  }
  //public menuType = this.all_response.location_menu;
  public location_title: any;
  ngOnInit() {
  window.localStorage.clear();
  console.log(this.all_response.location_menu.data[0].title);
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


//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
public your_locationid:any;
public menu_id:any;
public menu_response: any;
public set_response: any;
  dishList1(){
    return new Promise((resolve,reject) => {
      this.your_locationid= this.all_response.location_menu.data[0].location_id;
      this.menu_id=this.all_response.location_menu.data[0].id;
      var headers = new Headers({
            //'X-API-KEY': '123run',
            //"Authorization": 'Basic',
            //'username': 'devpankaj',
            //'password': 'devpankaj',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',            
          });
          const requestOptions = new RequestOptions({ headers: headers });          
          this.http.get("http://wiesoftware.com/greenchili/apisecure/location/locationMenuDishes/"+this.your_locationid+"/"+ this.menu_id ,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
          });
    }).then((result) => {
      this.menu_response = result;
      if(this.menu_response.status==false){
        this.presentToast();
      }
      else if(this.menu_response.status==true){
        this.set_response = {"location_menu":this.all_response.location_menu.data[0], "menu_list":this.menu_response};
        window.localStorage.setItem('menuKey', JSON.stringify(this.set_response));
        this.router.navigate(['\dishslist']);
        console.log(this.set_response);
      }      
    }, (err) => {
      this.presentToast();
    });;
  }

//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------

  dishList2(){
    return new Promise((resolve,reject) => {
      this.your_locationid= this.all_response.location_menu.data[1].location_id;
      this.menu_id=this.all_response.location_menu.data[1].id;
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
          
          this.http.get("http://wiesoftware.com/greenchili/apisecure/location/locationMenuDishes/"+this.your_locationid+"/"+ this.menu_id ,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
          });
    }).then((result) => {
      this.menu_response = result;
      if(this.menu_response.status==false){
        this.presentToast();
      }
      else if(this.menu_response.status==true){
        this.set_response = {"location_menu":this.all_response.location_menu.data[1], "menu_list":this.menu_response};
        window.localStorage.setItem('menuKey', JSON.stringify(this.set_response));
        this.router.navigate(['\dishslist']);
        console.log(this.set_response);
      }
      
    }, (err) => {
      this.presentToast();
    });;
  }

//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------

  dishList3(){
    return new Promise((resolve,reject) => {
      this.your_locationid= this.all_response.location_menu.data[2].location_id;
      this.menu_id=this.all_response.location_menu.data[2].id;
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
          
          this.http.get("http://wiesoftware.com/greenchili/apisecure/location/locationMenuDishes/"+this.your_locationid+"/"+ this.menu_id ,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
          });
    }).then((result) => {
      this.menu_response = result;
      if(this.menu_response.status==false){
        this.presentToast();
      }
      else if(this.menu_response.status==true){
        this.set_response = {"location_menu":this.all_response.location_menu.data[2], "menu_list":this.menu_response};
        window.localStorage.setItem('menuKey', JSON.stringify(this.set_response));
        this.router.navigate(['\dishslist']);
        console.log(this.set_response);
      }
      
    }, (err) => {
      this.presentToast();
    });;
  }

//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------

  dishList4(){
    return new Promise((resolve,reject) => {
      this.your_locationid= this.all_response.location_menu.data[3].location_id;
      this.menu_id=this.all_response.location_menu.data[3].id;
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
          
          this.http.get("http://wiesoftware.com/greenchili/apisecure/location/locationMenuDishes/"+this.your_locationid+"/"+ this.menu_id ,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
          });
    }).then((result) => {
      this.menu_response = result;
      if(this.menu_response.status==false){
        this.presentToast();
      }
      else if(this.menu_response.status==true){
        this.set_response = {"location_menu":this.all_response.location_menu.data[3], "menu_list":this.menu_response};
        window.localStorage.setItem('menuKey', JSON.stringify(this.set_response));
        this.router.navigate(['\dishslist']);
        console.log(this.set_response);
      }
      
    }, (err) => {
      this.presentToast();
    });;
  }

//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------

  dishList5(){
    return new Promise((resolve,reject) => {
      this.your_locationid= this.all_response.location_menu.data[4].location_id;
      this.menu_id=this.all_response.location_menu.data[4].id;
      var headers = new Headers({
            //'X-API-KEY': '123run',
            //"Authorization": 'Basic',
            //'username': 'devpankaj',
            //'password': 'devpankaj',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'            
          });
          const requestOptions = new RequestOptions({ headers: headers });          
          this.http.get("http://wiesoftware.com/greenchili/apisecure/location/locationMenuDishes/"+this.your_locationid+"/"+ this.menu_id ,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
          });
    }).then((result) => {
      this.menu_response = result;
      if(this.menu_response.status==false){
        this.presentToast();
      }
      else if(this.menu_response.status==true){
        this.set_response = {"location_menu":this.all_response.location_menu.data[4], "menu_list":this.menu_response};
        window.localStorage.setItem('menuKey', JSON.stringify(this.set_response));
        this.router.navigate(['\dishslist']);
        console.log(this.set_response);
      }
      
    }, (err) => {
      this.presentToast();
    });;
  }
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
  dishList6(){
    return new Promise((resolve,reject) => {
      this.your_locationid= this.all_response.location_menu.data[5].location_id;
      this.menu_id=this.all_response.location_menu.data[5].id;
      var headers = new Headers({
            //'X-API-KEY': '123run',
            //"Authorization": 'Basic',
            //'username': 'devpankaj',
            //'password': 'devpankaj',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'                     
          });
          const requestOptions = new RequestOptions({ headers: headers });          
          this.http.get("http://wiesoftware.com/greenchili/apisecure/location/locationMenuDishes/"+this.your_locationid+"/"+ this.menu_id ,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
          });
    }).then((result) => {
      this.menu_response = result;
      if(this.menu_response.status==false){
        this.presentToast();
      }
      else if(this.menu_response.status==true){        
        this.set_response = {"location_menu":this.all_response.location_menu.data[5], "menu_list":this.menu_response};
        window.localStorage.setItem('menuKey', JSON.stringify(this.set_response));
        this.router.navigate(['\dishslist']);
        console.log(this.set_response);
      }      
    }, (err) => {
      this.presentToast();
    });;
  }
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------

goBack(){  
  this.router.navigate(['\home']);
}
 }
