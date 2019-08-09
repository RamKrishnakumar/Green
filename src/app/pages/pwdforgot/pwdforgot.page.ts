import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup , FormControl, Validators } from '@angular/forms';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

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
              private alertController:AlertController,
              public authService: AuthService,
              public loadingController: LoadingController) { }

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
  const alert = await this.alertController.create({
    header: 'Alert',
    message: this.validate_response.message,
    buttons: ['OK'],
    cssClass: "alert-design"
  });

  await alert.present();
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

async errorAlert() {
  const alert = await this.alertController.create({
    header: 'Alert',
    message: 'please try after sometime, network error',
    buttons: ['OK'],
    cssClass: "toast-design"
  });

  await alert.present();

}
//----------------------------------------------------------------------------------------------------------------------
  public validate_response:any;
  async Resetpwd(){
    const loading = await this.loadingController.create({
      message: 'Please Wait',
      translucent: true,
    });
  await loading.present();
    let body = 'email=' + this.validations_form.value.registeredemail;
    this.authService.ResetPwd(body).then((result) => {
      this.validate_response = result;
      if(this.validate_response.status==false){
        this.notvalidAlert();
        this.validations_form.reset();
        loading.dismiss();
      }
      else if(this.validate_response.status==true){
        this.successReset();
        this.validations_form.reset();
        this.router.navigate(['login']);
        loading.dismiss();
      }
    }, (err) => {
      this.errorAlert();
      loading.dismiss();
      
    });;
  }
  //---------------------------------End of Reset password function--------------------------------------------------
  Login(){
    this.router.navigate(['login']);
  }

}
