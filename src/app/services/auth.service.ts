import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs';
import { AlertController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { resolve } from 'dns';
import { reject } from 'q';
import { headersToString } from 'selenium-webdriver/http';


//let apiUrl = "http://wiesoftware.com/greenchili/apisecure/login/";
//let apiUrl="http://localhost/greenchili/";
//let apiUrl="http://localhost/greenchili/login/auth/user_login/,"



@Injectable({
  providedIn: 'root'
 
})
export class AuthService {
  
  response:any;
  test_body

  

  constructor(public https: Http, 
              public alertController: AlertController,
              private http: HttpClient,
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

  UserLogin(body){ 
    return new Promise((resolve,reject) => {
      //let body = 'email=' + this.validations_form.value.email + '&password=' + this.validations_form.value.password;
      
      var headers = new Headers({
           'Content-Type': 'application/x-www-form-urlencoded',
           'Accept': 'application/json',
            
          });
          const requestOptions = new RequestOptions({ headers: headers });
          this.https.post("http://wiesoftware.com/greenchili/apisecure/login/loginUsers/", body,requestOptions).subscribe(res => {
           resolve(res.json());
           this.response= res.json(); 
           //this.test_body= body;
          // this.successResponse();
           },(err) => {
            reject(err);
            //this.response = err;
            this.test_body=body;
            //this.error();
          });
    });
  }
  
  Login(body): Observable<any> {
    return this.http.post<any>('http://wiesoftware.com/greenchili/apisecure/login/loginUsers/',body).pipe(tap(_ => this.log('login')),
    catchError(this.handleError('login', []))
    );

  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
  

  signUp(body) {
    //let body = 'name='+ this.validations_form.value.name + '&email=' + this.validations_form.value.email +'&contact_no='+ this.validations_form.value.mobilenumber + '&address='+this.validations_form.value.address + '&city='+this.validations_form.value.city + '&province=' + this.validations_form.value.province +'&zipcode' + this.validations_form.value.zipcode + '&remark='+ "" + '&password=' + this.validations_form.value.enterpassword ;
    var headers = new Headers({
      //'X-API-KEY': '123run',
      'Content-Type': 'application/x-www-form-urlencoded',
     // 'Access-Control-Allow-Origin' : '*'
      'Accept': 'application/json'
    });
    const requestOptions = new RequestOptions({ headers: headers });
    this.http.post("http://localhost/greenchili/login-signin", body).subscribe(res => {
        console.log(res['_body']);
       }, error => {
        console.log(error);
      });
  }

  UserDetails(user_id){
    return new Promise((resolve,reject) => {
      var headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            });
          const requestOptions = new RequestOptions({ headers: headers });
          //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
          this.https.get("http://wiesoftware.com/greenchili/apisecure/userDetails/"+user_id,requestOptions).subscribe(res => {
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
          this.https.post("http://wiesoftware.com/greenchili/apisecure/userProfileEdit/"+user_id,body,requestOptions).subscribe(res => {
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
      this.https.post("http://wiesoftware.com/greenchili/apisecure/onlineReservation",body, requestOptions).subscribe(res =>{
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
    });
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // login(value){
  //   console.log(value);
  //   let url = apiUrl + 'loginUsers';
  //   let headers = new Headers();
  //   headers.append('Access-Control-Allow-Origin' , '*');
  //   headers.append('Access-Control-Allow-Methods', 'POST');
  //   headers.append('Accept','application/json');
  //   headers.append('content-type','application/json');
  //     let options = new RequestOptions({ headers:headers});
  //   return new Promise((resolve,reject)=>{
  //      this.http.post(url,JSON.stringify(value), options).subscribe(res => {
  //        console.log('succ');
  //         resolve(res.json());
  //       }, (err) => {
  //         console.log('err');
  //         console.log(err);
  //         reject(err);
  //       });
  //   })
  // }
  

  
  
 
  








  
  // userlogin(value){
    
  //   return new Promise((resolve,reject) => {
  //     //var headers = new Headers();
  //     //this.http({method:'POST', url:apiUrl + '/loginUsers', data:value} )
      
  //     this.http.post(apiUrl + 'loginUsers', value).subscribe(res => {
  //       console.log(res);
  //        resolve(res.json());
  //     }, (err) => {
  //       console.log(err);
  //       reject(err);
  //     });
  //   });
  // }


 //apiUrl= "http://wiesoftware.com/greenchili/apisecure/login/";
  
 
 
 // authorizaiton(value){
  //   return new Promise((resolve,reject) => {
  //     var headers = new Headers({'X-API-Key': apiKey});
  //     headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //     headers.append('Access-Control-Allow-Origin' , '*');
  //     headers.append('Access-Control-Allow-Methods', 'POST, GET');
  //     this.http.post(apiUrl, value, {headers: headers}).subscribe(res => {
  //       resolve(res.json());
  //     }, (err) => {
  //       reject(err);
  //     });
  //   });
  // }
  // httpPost = {
  //   headers: new HttpHeaders({
  //     'Access-Control-Allow-Origin' : '*',
  //     'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
  //     'Accept':'application/json;charset=utf-8',
  //     //'content-type':'application/json'
  //     'Content-type': 'application/x-www-form-urlencoded'
  //   })
  // } 

  // userlogin(value) : Observable<any>{
    
  //   return this.http.post<any>(this.apiUrl + 'loginUsers', value).pipe(retry(1),
  //   catchError(this.handleError)
  //   )
  // } 

  // handleError(error) {
  //   let errorMessage = 'Connection Fails';
  //   if(error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }

}
