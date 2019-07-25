import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PasswordValidator } from '../../validators/password.validator';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

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
              public http: Http,
              public authService: AuthService,
              public alertController: AlertController
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
    this.router.navigate(['\login']);
  }
//-------------------------ToastControllers--------------------------------------
  //---Toast appered when connection with api failed-------------------
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Connection Failed',
      color: "danger",
      duration: 2000
    });
    toast.present();
  }
//---------api conection failded toast ends here--------------------------------------------------------------------------------------------------------------
//----------------Successful SignUp Toast---------------------------------------------------------------------------------------
async signUpsuccess() {
  const toast = await this.toastController.create({
    //header: " Hello, " + this.validate_response.data.name,
    message: this.validate_response.message,
    color: "dark",
    duration: 3000,
    position:"top",
    cssClass: "toast"
  });
  toast.present();
}
//---------------Successful SignUp Toast Ends here------------------------------------------------------------------------------
//------------------------Toastcontroller ends here-----------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//---------------Alert appeares when email or mobile no. already existed in database------------------------------------
async overrideAlert() {
  const alert = await this.alertController.create({
    header: 'Alert',
    message: this.validate_response.message,
    buttons: ['OK'],
    cssClass: "alert-design"
  });

  await alert.present();
}
//----------------------------------------------------------------------------------------------------------------------


//login page submit button working function-------------------------------------------------------------------------------------------
  validate_response: any;
  signUp(){
    return new Promise((resolve,reject) => {
      let body = 'name='+ this.validations_form.value.name + '&email=' + this.validations_form.value.email +'&contact_no='+ this.validations_form.value.contact_no + '&address='+this.validations_form.value.address + '&city='+this.validations_form.value.city + '&province=' + this.validations_form.value.province +'&zipcode=' + this.validations_form.value.zipcode + '&remark='+ this.validations_form.value.remark + '&password=' + this.matching_passwords_group.value.password ;
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
          this.http.post("http://wiesoftware.com/greenchili/apisecure/login/registerUsers", body,requestOptions).subscribe(res => {
           resolve(res.json());
           },(err) => {
            reject(err);
            
          });
    }).then((result) => {
      this.validate_response = result;
      if(this.validate_response.status==false){
        this.validations_form.reset();
        this.overrideAlert();
      }
      else if(this.validate_response.status==true){
        this.signUpsuccess();
        this.validations_form.reset();
        this.router.navigate(['\login']);
      }
    }, (err) => {
      this.presentToast();
    });;
  }
  //-------------SignUp page login button funtion ends here----------------------------------------------- 
}


