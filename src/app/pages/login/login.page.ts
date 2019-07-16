import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

validations_form: FormGroup;
errorMessage:string='';

validation_messages= {
  'username': [
    {type: 'required',message:'Username is required'},
  ],
  'password':[
    {type: 'required',message:'Password is required'},
    {type: 'pattern', message: 'Password Should be minimum 8 Digits & Atleast one no. & one special character.'}
  ],
};



  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private toastController: ToastController,
              public authService: AuthService
              ) { }



  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)        
      ])),
      password: new FormControl('', Validators.compose([
        Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$"),
        Validators.required
      ])),     
    });
  }

  //Toast Controller  for showing the response of servie when we hit API....................
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Connection Failed',
      color: "danger",
      duration: 2000
    });
    toast.present();
  }

  SignUp(){
    
    this.router.navigate(['\signup']);
   }
   
// Function works when Login Butto on login.html pressed..........
  private validate_response: any;
   tryLogin(value){
    this.authService.login(this.validations_form.value).then((result) => {
      this.validate_response = result;
      console.log(this.validate_response);
    }, (err) => {
      this.presentToast();
    });
  }
  // tryLogin(value) {
  //   this.authService.test(this.validations_form.value).subscribe((data: {}) => {
  //     console.log(data);
  //     this.validate_response = data;
  //     this.router.navigate(['/home'])
  //   },(err)=> {
  //     this.presentToast();
  //   })
    
  // }
// Login Button function Ends here----------------------------------------------------------------------


   Forgot(){
    this.router.navigate(['\pwdforgot']);
  }
}
