import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs';
import { AlertController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
 
})
export class AuthService {
  
  response:any;
  test_body

  

  constructor(public http: Http, 
              public alertController: AlertController,
              private https: HttpClient,
               ) { }

               async successResponse() {
                const alert = await this.alertController.create({
                  header: 'Alert',
                  message: 'api hitting successfully',
                  buttons: ['OK'],
                  cssClass: "toast-design"
                });
              
                await alert.present();
              }

              async error() {
                const alert = await this.alertController.create({
                  header: 'Alert',
                  message: this.response,
                  buttons: ['OK'],
                  cssClass: "toast-design"
                });
              
                await alert.present();
              }
  
  
  // userLogin(body){
    
  //   return new Promise((resolve,reject) => {
  //     var headers = new Headers({
  //                 //'Content-Type': 'application/form-data',
  //                 //'Accept': 'application/json',
  //                 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  //                 'Accept': 'application/json',
  //                 //'Access-Control-Allow-Origin' : '*'
  //               });
      
  //               const requestOptions = new RequestOptions({ headers: headers });
                
  //     this.http.post("http://wiesoftware.com/greenchili/apisecure/login/loginUsers",JSON.stringify(body),requestOptions).subscribe(res => {
  //       console.log(res);
  //        resolve(res.json());
         
  //     }, (err) => {
  //       console.log(err);
  //       reject(err);
  //     });
  //   });
  // }



  //Perfect running confirm functions
  UserLogin(body){ 
    return new Promise((resolve,reject) => {
      //let body = 'email=' + this.validations_form.value.email + '&password=' + this.validations_form.value.password;
      //email=ram123@gmal.com&password=Admi@123
      var headers = new Headers({
           //'Content-Type': 'application/json; charset=utf-8',
          // 'Accept': 'application/json', 
          'content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'           
          });
          const requestOptions = new RequestOptions({ headers: headers });
          this.http.post("http://greenchili.ca/apisecure/login/loginUsers", body,requestOptions).subscribe(res => {
           resolve(res.json());
           this.response= res.json(); 
           console.log(this.response);
           },(err) => {
            reject(err);
            console.log(err);
          });
    });
  }

  SignUp(body) {
    return new Promise((resolve,reject) => {
      var headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',            
          });
          const requestOptions = new RequestOptions({ headers: headers });
          //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
          this.http.post("http://greenchili.ca/apisecure/login/registerUsers", body,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);            
          });
    });
  }

  myOrders(user_id){
    return new Promise((resolve,reject) => {
      
      
      var headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',                      
          });
          const requestOptions = new RequestOptions({ headers: headers });
          //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
          this.http.get(" http://greenchili.ca/apisecure/order/orderHistory/"+user_id,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
          });
    })
  }

  UserDetails(user_id){
    return new Promise((resolve,reject) => {
      var headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            });
          const requestOptions = new RequestOptions({ headers: headers });
          //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
          this.http.get("http://greenchili.ca/apisecure/userDetails/"+user_id,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
            });
    });
  }
  
  UpdateProfile(user_id,body){
    return new Promise((resolve,reject) => {
      var headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            });
          const requestOptions = new RequestOptions({ headers: headers });
          //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
          this.http.post("http://greenchili.ca/apisecure/userProfileEdit/"+user_id,body,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
            
          });
    });
  }

  OnlineReservation(body){
    return new Promise((resolve,reject) => {
      var headers = new Headers({
        'content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      });
      const requestOptions = new RequestOptions({headers: headers});
      this.http.post("http://greenchili.ca/apisecure/onlineReservation",body, requestOptions).subscribe(res =>{
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
    });
  }

  ResetPwd(body){
    return new Promise((resolve,reject) => {      
      var headers = new Headers({
            
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',                      
          });
          const requestOptions = new RequestOptions({ headers: headers });
          //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
          this.http.post("http://greenchili.ca/apisecure/login/forgetPassword", body,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
          });
    })
  }

  LocationData(){
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
          this.http.get(" http://greenchili.ca/apisecure/location/locations/",requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
          });
    })
  }

  LocationList(id){
    return new Promise((resolve,reject) => {
      
      var headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json', 
                       
          });
          const requestOptions = new RequestOptions({ headers: headers });
          
          this.http.get("http://greenchili.ca/apisecure/location/locationMenu/"+ id,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
          });
    })
  }

  DishList(location_id,id){
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
          this.http.get(" http://greenchili.ca/apisecure/location/locationMenuDishes/"+location_id+"/"+id ,requestOptions).subscribe(res => {
          resolve(res.json());
           },(err) => {
            reject(err);
          });
    })
  }

  ViewDish(id){
    return new Promise((resolve,reject) => {
      var headers = new Headers({          
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',       
            });
          const requestOptions = new RequestOptions({ headers: headers });
          //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
          this.http.get("http://greenchili.ca/apisecure/location/locationDishDetails/"+id,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
          });
    })
  }

  PlaceOrder(body){
    return new Promise((resolve,reject) => {              
      var headers = new Headers({
            //"Authorization": 'Basic',
            //"username": 'devpankaj',
            //"password": 'devpankaj',
            //"X-API-KEY": '123run',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',            
          });
          const requestOptions = new RequestOptions({ headers: headers });
          //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
          this.http.post("  http://greenchili.ca/apisecure/payment/paymentBilling", body,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
          });
    })
  }










    //Perfect running testing api functions
  // UserLogin(body){ 
  //   return new Promise((resolve,reject) => {
  //     //let body = 'email=' + this.validations_form.value.email + '&password=' + this.validations_form.value.password;
  //     //email=ram123@gmal.com&password=Admi@123
  //     var headers = new Headers({
  //          //'Content-Type': 'application/json; charset=utf-8',
  //         // 'Accept': 'application/json', 
  //         'content-Type': 'application/x-www-form-urlencoded',
  //       'Accept': 'application/json'           
  //         });
  //         const requestOptions = new RequestOptions({ headers: headers });
  //         this.http.post("http://wiesoftware.com/greenchili/apisecure/login/loginUsers/", body,requestOptions).subscribe(res => {
  //          resolve(res.json());
  //          this.response= res.json(); 
  //          console.log(this.response);
  //          },(err) => {
  //           reject(err);
  //           console.log(err);
  //         });
  //   });
  // }
  
  // SignUp(body) {
  //   return new Promise((resolve,reject) => {
  //     var headers = new Headers({
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //           'Accept': 'application/json',            
  //         });
  //         const requestOptions = new RequestOptions({ headers: headers });
  //         //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
  //         this.http.post("http://wiesoftware.com/greenchili/apisecure/login/registerUsers", body,requestOptions).subscribe(res => {
  //          resolve(res.json());
  //          },(err) => {
  //           reject(err);            
  //         });
  //   });
  // }

  // myOrders(user_id){
  //   return new Promise((resolve,reject) => {
      
      
  //     var headers = new Headers({
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //           'Accept': 'application/json',                      
  //         });
  //         const requestOptions = new RequestOptions({ headers: headers });
  //         //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
  //         this.http.get(" http://wiesoftware.com/greenchili/apisecure/order/orderHistory/"+user_id,requestOptions).subscribe(res => {
  //          resolve(res.json());
  //          },(err) => {
  //           reject(err);
  //         });
  //   })
  // }

  // UserDetails(user_id){
  //   return new Promise((resolve,reject) => {
  //     var headers = new Headers({
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //           'Accept': 'application/json',
  //           });
  //         const requestOptions = new RequestOptions({ headers: headers });
  //         //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
  //         this.http.get("http://wiesoftware.com/greenchili/apisecure/userDetails/"+user_id,requestOptions).subscribe(res => {
  //          resolve(res.json());
  //          },(err) => {
  //           reject(err);
  //           });
  //   });
  // }
  
  // UpdateProfile(user_id,body){
  //   return new Promise((resolve,reject) => {
  //     var headers = new Headers({
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //           'Accept': 'application/json',
  //           });
  //         const requestOptions = new RequestOptions({ headers: headers });
  //         //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
  //         this.http.post("http://wiesoftware.com/greenchili/apisecure/userProfileEdit/"+user_id,body,requestOptions).subscribe(res => {
  //          resolve(res.json());
  //          },(err) => {
  //           reject(err);
            
  //         });
  //   });
  // }

  // OnlineReservation(body){
  //   return new Promise((resolve,reject) => {
  //     var headers = new Headers({
  //       'content-Type': 'application/x-www-form-urlencoded',
  //       'Accept': 'application/json'
  //     });
  //     const requestOptions = new RequestOptions({headers: headers});
  //     this.http.post("http://wiesoftware.com/greenchili/apisecure/onlineReservation",body, requestOptions).subscribe(res =>{
  //       resolve(res.json());
  //     }, (err) => {
  //       reject(err);
  //     });
  //   });
  // }

  // ResetPwd(body){
  //   return new Promise((resolve,reject) => {      
  //     var headers = new Headers({
            
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //           'Accept': 'application/json',                      
  //         });
  //         const requestOptions = new RequestOptions({ headers: headers });
  //         //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
  //         this.http.post("http://wiesoftware.com/greenchili/apisecure/login/forgetPassword", body,requestOptions).subscribe(res => {
  //          resolve(res.json());
  //          },(err) => {
  //           reject(err);
  //         });
  //   })
  // }

  // LocationData(){
  //   return new Promise((resolve,reject) => {
  //     var headers = new Headers({
  //           //'X-API-KEY': '123run',
  //           //"Authorization": 'Basic',
  //           //'username': 'devpankaj',
  //           //'password': 'devpankaj',
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //           'Accept': 'application/json',
  //           //'Access-Control-Allow-Methods': 'POST',
            
  //         });
  //         const requestOptions = new RequestOptions({ headers: headers });
  //         //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
  //         this.http.get(" http://wiesoftware.com/greenchili/apisecure/location/locations/",requestOptions).subscribe(res => {
  //          resolve(res.json());
  //          },(err) => {
  //           reject(err);
  //         });
  //   })
  // }

  // LocationList(id){
  //   return new Promise((resolve,reject) => {
      
  //     var headers = new Headers({
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //           'Accept': 'application/json', 
                       
  //         });
  //         const requestOptions = new RequestOptions({ headers: headers });
          
  //         this.http.get("http://wiesoftware.com/greenchili/apisecure/location/locationMenu/"+ id,requestOptions).subscribe(res => {
  //          resolve(res.json());
  //          },(err) => {
  //           reject(err);
  //         });
  //   })
  // }

  // DishList(location_id,id){
  //   return new Promise((resolve,reject) => {
      
  //     var headers = new Headers({
  //           //'X-API-KEY': '123run',
  //           //"Authorization": 'Basic',
  //           //'username': 'devpankaj',
  //           //'password': 'devpankaj',
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //           'Accept': 'application/json',            
  //         });
  //         const requestOptions = new RequestOptions({ headers: headers });
  //         this.http.get(" http://wiesoftware.com/greenchili/apisecure/location/locationMenuDishes/"+location_id+"/"+id ,requestOptions).subscribe(res => {
  //         resolve(res.json());
  //          },(err) => {
  //           reject(err);
  //         });
  //   })
  // }

  // ViewDish(id){
  //   return new Promise((resolve,reject) => {
  //     var headers = new Headers({          
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //           'Accept': 'application/json',       
  //           });
  //         const requestOptions = new RequestOptions({ headers: headers });
  //         //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
  //         this.http.get("http://wiesoftware.com/greenchili/apisecure/location/locationDishDetails/"+id,requestOptions).subscribe(res => {
  //          resolve(res.json());
  //          },(err) => {
  //           reject(err);
  //         });
  //   })
  // }

  // PlaceOrder(body){
  //   return new Promise((resolve,reject) => {              
  //     var headers = new Headers({
  //           //"Authorization": 'Basic',
  //           //"username": 'devpankaj',
  //           //"password": 'devpankaj',
  //           //"X-API-KEY": '123run',
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //           'Accept': 'application/json',            
  //         });
  //         const requestOptions = new RequestOptions({ headers: headers });
  //         //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
  //         this.http.post("  http://wiesoftware.com/greenchili/apisecure/payment/paymentBilling", body,requestOptions).subscribe(res => {
  //          resolve(res.json());
  //          },(err) => {
  //           reject(err);
  //         });
  //   })
  // }

}
