import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs';


//let apiUrl = "http://wiesoftware.com/greenchili/apisecure/login/";
//let apiUrl="http://localhost/greenchili/";
//let apiUrl="http://localhost/greenchili/login/auth/user_login/,"



@Injectable({
  providedIn: 'root'
 
})
export class AuthService {

  

  constructor(public http: Http, 
               ) { }
  
  
  userLogin(body){
    
    return new Promise((resolve,reject) => {
      var headers = new Headers({
                  //'Content-Type': 'application/form-data',
                  //'Accept': 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                  'Accept': 'application/json',
                  //'Access-Control-Allow-Origin' : '*'
                });
      
                const requestOptions = new RequestOptions({ headers: headers });
                
      this.http.post("http://wiesoftware.com/greenchili/apisecure/login/loginUsers",JSON.stringify(body),requestOptions).subscribe(res => {
        console.log(res);
         resolve(res.json());
      }, (err) => {
        console.log(err);
        reject(err);
      });
    });
  }
  

  signUp(body) {
    //let body = 'name='+ this.validations_form.value.name + '&email=' + this.validations_form.value.email +'&contact_no='+ this.validations_form.value.mobilenumber + '&address='+this.validations_form.value.address + '&city='+this.validations_form.value.city + '&province=' + this.validations_form.value.province +'&zipcode' + this.validations_form.value.zipcode + '&remark='+ "" + '&password=' + this.validations_form.value.enterpassword ;
    var headers = new Headers({
      'X-API-KEY': '123run',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin' : '*'
      //'Accept': 'application/json'
    });
    const requestOptions = new RequestOptions({ headers: headers });
    this.http.post("http://localhost/greenchili/login-signin", body, requestOptions)
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);
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
