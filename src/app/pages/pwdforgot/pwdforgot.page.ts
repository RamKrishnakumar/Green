import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup , FormControl, Validators } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs';

@Component({
  selector: 'app-pwdforgot',
  templateUrl: './pwdforgot.page.html',
  styleUrls: ['./pwdforgot.page.scss'],
})
export class PwdforgotPage implements OnInit {

  validations_form: FormGroup;
              errorMessage:string='';
              
              validation_messages= {
                'registeredemail': [
                  {type: 'required',message:'email is required!'},
                  {type: 'pattern', message:'Please enter valid email address'}
                ],
              };

  constructor(private formBuilder:FormBuilder,
              private router: Router,
              private toastController: ToastController,
              public http: Http,
              private alertController:AlertController) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      registeredemail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"),       
      ])),    
    });
  }
  //---------------------------------------ToastController-------------------------------------------------------------
  //............Toast appears when api connection failed.......................................................
  async apiConnection() {
    const toast = await this.toastController.create({
      message: 'Connection Failed',
      color: "danger",
      duration: 2000,
      cssClass:"alert-design",
      position:"top"
    });
    toast.present();
  }

//............End of api connection failed Toast..........................................................................

//............Toast of Successfull reseting password.......................................................................
async successReset() {
  const toast = await this.toastController.create({
    message: this.validate_response.message,    
    color: "dark",
    duration: 3000,
    cssClass:"alert-design",
    position:"top"
    });
  toast.present();
}
//.............End of Toast of Successfull reset...........................................................................
//---------------------------------------End of ToastController-------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------
//---------------Alert appeares when email id not exists in database------------------------------------
async notvalidAlert() {
  const alert = await this.alertController.create({
    header: 'Alert',
    message: this.validate_response.message,
    buttons: ['OK'],
    cssClass: "alert-design"
  });

  await alert.present();
}
//----------------------------------------------------------------------------------------------------------------------
  public validate_response:any;
  Resetpwd(){
    return new Promise((resolve,reject) => {
      let body = 'email=' + this.validations_form.value.registeredemail;
      
      var headers = new Headers({
            //'X-API-KEY': '123run',
            //"Authorization": 'Basic',
            //'username': 'devpankaj',
            //'password': 'devpankaj',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',                      
          });
          const requestOptions = new RequestOptions({ headers: headers });
          //let body = [{"email": this.validations_form.value.email, "password": this.validations_form.value.password}];
          this.http.post("http://wiesoftware.com/greenchili/apisecure/login/forgetPassword", body,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
          });
    }).then((result) => {
      this.validate_response = result;
      if(this.validate_response.status==false){
        this.notvalidAlert();
        this.validations_form.reset();
      }
      else if(this.validate_response.status==true){
        this.successReset();
        this.validations_form.reset();
        this.router.navigate(['\login']);
      }
    }, (err) => {
      this.apiConnection();
    });;
  }
  //---------------------------------End of Reset password function--------------------------------------------------
  Login(){
    this.router.navigate(['\login']);
  }

}
