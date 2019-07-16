import { Injectable } from '@angular/core';
import { Http ,Headers, Request,RequestOptions} from '@angular/http';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable, of, throwError } from 'rxjs'
//import { map, retry, catchError, tap } from 'rxjs/operators';
//import { Body } from '@angular/http/src/body';


let apiUrl = "http://wiesoftware.com/greenchili/apisecure/login/";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

 

  constructor(public http: Http ) { }
  
  

  login(value){
    console.log(value);
    let url = apiUrl + 'loginUsers';
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
      let options = new RequestOptions({ headers:headers});
    return new Promise((resolve,reject)=>{
       this.http.post(url,JSON.stringify(value), options).subscribe(res => {
         console.log('succ');
          resolve(res.json());
        }, (err) => {
          console.log('err');
          console.log(err);
          reject(err);
        });
    })
  }
  

  
  
  
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
