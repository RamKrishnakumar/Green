import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController,AlertController, LoadingController } from '@ionic/angular';
import { PasswordValidator } from '../../validators/password.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  validations_form: FormGroup;
  errorMessage:string='';
  matching_passwords_group: FormGroup;

  validation_messages= {
    'name': [
      {type: 'required',message:'Username is required'},
    ],
    'email' : [
      {type: 'required', message:'email is required!'},
      {type: 'pattern', message:'Please enter valid email address!'}
    ],
    'contact_no' : [
      {type: 'required', message:'Mobile no. is required!'},
      {type: 'pattern', message:'Enter valid Mobile Number!'}
    ],
    'address' : [
      {type: 'required', message:'address is required!'},
    ],
    'city' : [
      {type: 'required', message:'city is required!'},
    ],
    'province' : [
      {type: 'required', message:'province is required!'},
    ],
    'zipcode' : [
      {type: 'required', message:'ZipCode is required!'},
      {type: 'patten', message: 'Enter a Valid Zipcode!'}
    ],
    'remark' : [
      {type: 'required', message:'Remarks is required'},
    ],
    'password':[
      {type: 'required',message:'Password is required'},
      {type: 'pattern', message: 'Password Should be minimum 8 Digits & Atleast one no. & one special character.'}
    ],
    'confirmpassword' : [
      {type: 'required', message:'Confirmation is required'},
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
  };

  constructor(
               private formBuilder: FormBuilder,
              private router: Router,
              private toastController: ToastController,
              public authService: AuthService,
              public alertController: AlertController,
              public loadingController: LoadingController
  ) { }

  ngOnInit() {

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$"),
        Validators.required
      ])),
      confirmpassword: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,        
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"),
      ])),
      contact_no: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]{10}$")
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      city: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      province: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      zipcode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[1-9][0-9]{5}$")
      ])),
      remark:new FormControl('', Validators.compose([
        Validators.required,
      ])),
      matching_passwords: this.matching_passwords_group,
    });
  }

  login(){
    this.router.navigate(['login']);
  }

//---------------Alert appeares when email or mobile no. already existed in database------------------------------------
//----------------Successful SignUp Alert---------------------------------------------------------------------------------------


async signUpsuccess() {
  const alert = await this.alertController.create({
    header: 'Alert',
    message: this.validate_response.message,
    buttons: ['OK'],
    cssClass: "alert-design"
  });

  await alert.present();
}
//---------------Successful SignUp Alert Ends here------------------------------------------------------------------------------


async overrideAlert() {
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


//login page submit button working function-------------------------------------------------------------------------------------------
  validate_response: any;
  async signUp(){
    const loading = await this.loadingController.create({
      message: 'Please Wait',
      translucent: true,
    });
    await loading.present();
    let body = 'name='+ this.validations_form.value.name + '&email=' + this.validations_form.value.email +'&contact_no='+ this.validations_form.value.contact_no + '&address='+this.validations_form.value.address + '&city='+this.validations_form.value.city + '&province=' + this.validations_form.value.province +'&zipcode=' + this.validations_form.value.zipcode + '&remark='+ this.validations_form.value.remark + '&password=' + this.matching_passwords_group.value.password ;
    this.authService.SignUp(body).then((result) => {
      this.validate_response = result;
      if(this.validate_response.status==false){
        this.validations_form.reset();
        this.overrideAlert();
        loading.dismiss();
      }
      else if(this.validate_response.status==true){
        this.signUpsuccess();
        this.validations_form.reset();
        loading.dismiss();
        this.router.navigate(['login']);

      }
    }, (err) => {
      loading.dismiss();
      this.errorAlert();
    });;
  }
  //-------------SignUp page login button funtion ends here----------------------------------------------- 
}


