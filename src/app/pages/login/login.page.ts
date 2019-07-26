import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController,AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

validations_form: FormGroup;
errorMessage:string='';

validation_messages= {
  'email': [
    {type: 'required',message:'Username is required'},
    {type: 'pattern', message: 'Enter valid email/10digit mobile no. format'}
  ],
  'password':[
    {type: 'required',message:'Password is required'},
    {type: 'pattern', message: 'Password Should be minimum 8 Digits & Atleast one no. & one special character.'}
  ],
};

location_menu={
  
}
constructor(private formBuilder: FormBuilder,
            private router: Router,
            private toastController: ToastController,
            public authService: AuthService,
            public http: Http,
            public alertController: AlertController
              ) { }



  ngOnInit() {
    window.localStorage.clear();

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}|^[0-9]{10}$")     
      ])),
      password: new FormControl('', Validators.compose([
        Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$"),
        Validators.required
      ])),     
    });
  }
//-------------------------------Toastcontrollers------------------------------------------------------------------------
  //......................Toast Controller  for showing the response of servie when we hit API...........................
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Connection Failed',
      color: "danger",
      duration: 2000, 
      position: "top",
      cssClass: "toast-design"   
    });
    toast.present();
  }
  //......................End...........................................................................................

  // async Invalid() {
  //   const toast = await this.toastController.create({
  //     color: "dark",
  //     header: this.validate_response.message,
  //     message: "Please try again",
  //     duration: 3000,
  //     position:"top"
  //   });
  //   toast.present();
  // }
//..................loginSuccess Toaster.................................................................................
  async loginsuccess() {
    const toast = await this.toastController.create({
      header: " Hello, " + this.validate_response.data.name,
      color: "dark",
      duration: 3000,
      position:"top",
      cssClass:"toast-design"
    });
    toast.present();
  }
//..................End of loginSuccess Toaster..........................................................................
//-------------------------------End of Toastcontrollers----------------------------------------------------------------------------------------


//----------------------Alert Controllers--------------------------------------------------------------------------------
//.................Invalid Credentials Alert............................................................................
async invalid() {
  const alert = await this.alertController.create({
    header: 'Alert',
    message: this.validate_response.message,
    buttons: ['OK'],
    cssClass: "toast-design"
  });

  await alert.present();
}
//.................Invalid Credentials Alert............................................................................
//----------------------End of Alert Controllers--------------------------------------------------------------------------------
SignUp(){
    
    this.router.navigate(['\signup']);
   }
   
//..... Function works when Login Butto on login.html pressed.................................................................
  private validate_response: any;
  tryLogin(){
    return new Promise((resolve,reject) => {
      let body = 'email=' + this.validations_form.value.email + '&password=' + this.validations_form.value.password;
      
      var headers = new Headers({
            //"Authorization": 'Basic',
            //"username": 'devpankaj',
            //"password": 'devpankaj',
            //"X-API-KEY": '123run',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            //'Access-Control-Allow-Methods': 'POST',
            
          });
          const requestOptions = new RequestOptions({ headers: headers });
          //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
          this.http.post("http://wiesoftware.com/greenchili/apisecure/login/loginUsers", body,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
            this.presentToast();
          });
    }).then((result) => {
      this.validate_response = result;
      if(this.validate_response.status==false){
          this.invalid();
          this.validations_form.reset();
        }
       else if(this.validate_response.status==true){
          this.validations_form.reset(); 
         window.localStorage.setItem('userKey', JSON.stringify(this.validate_response.data.users_id));         
         this.router.navigate(['\home']);
         this.loginsuccess();
         
         }
    }, (err) => {
      this.presentToast();
    });;
  }
//----------------------------------------------------------------------------------------------------------------------- 
// Login Button function Ends here---------------------------------------------------------------------------------------


   Forgot(){
    this.router.navigate(['\pwdforgot']);
  }
  Home(){
    this.router.navigate(['\home']);
  }
}
