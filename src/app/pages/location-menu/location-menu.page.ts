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
  menuType:any;
  empty:any;
  //public menuType = this.all_response.location_menu;
  public location_title: any;
  
  ngOnInit() {
  window.localStorage.clear();
  this.menuType = this.all_response.location_menu.data;
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
public id_number: any;
public subtract: number;


dishList1(id:string,location_id:string,title:string){
    return new Promise((resolve,reject) => {
      this.your_locationid=location_id;
      this.menu_id=id;
      var headers = new Headers({
            //'X-API-KEY': '123run',
            //"Authorization": 'Basic',
            //'username': 'devpankaj',
            //'password': 'devpankaj',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',            
          });
          const requestOptions = new RequestOptions({ headers: headers });
          this.http.get(" http://greenchili.ca/apisecure/location/locationMenuDishes/"+location_id+"/"+id ,requestOptions).subscribe(res => {
          resolve(res.json());
           },(err) => {
            reject(err);
          });
    }).then((result) => {
      this.menu_response = result;
      if(this.menu_response.status==false){
        this.falseStatus();
      }
      else if(this.menu_response.status==true){
        this.id_number=location_id;
        this.subtract=this.id_number-1;
        this.set_response = {"menu_type":title, "menu_list":this.menu_response};
        window.localStorage.setItem('menuKey', JSON.stringify(this.set_response));
        this.router.navigate(['\dishslist']);
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
