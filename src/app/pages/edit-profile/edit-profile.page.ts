import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  public backPages =[
    {url: '/profile'}];

    validations_form: FormGroup;
    errorMessage:string='';
    user_id;
    user_details;
    profile_updated;

validation_messages= {
  'name': [
    {type: 'required',message:'Name is required'}
  ],
  'email': [
    {type: 'required',message:'Email is required'},
    {type: 'pattern', message: 'Enter valid email format'}
  ],
  'contact_no':[
    {type: 'required',message:'Contact no. is required'},
    {type: 'pattern', message: 'Contact no. should be in correct format'}
  ],
  'address':[
    {type: 'required',message:'Address is required'},
  ],
  'city':[
    {type: 'required',message:'Please provide your city'},
    {type: 'pattern', message: 'Contact no. should be in correct format'}
  ],
  'zipcode':[
    {type: 'required',message:'Please Enter Zipcode'},
    {type: 'pattern', message: 'Zipcode should be in correct format'}
  ],
  'province':[
    {type: 'required',message:'Province is required'},
  ],
  'remarks':[
    {type: 'required',message:'Please Enter some Remarks'},
  ],
};

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              public toastController:ToastController,
              public alertController: AlertController,
              public router: Router) { }

  ngOnInit() {
    this.user_id = JSON.parse(window.localStorage.getItem('userKey'));
    this.userDetails();
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,     
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}")     
      ])),
      contact_no: new FormControl('', Validators.compose([
        Validators.pattern("^[0-9]{10}$"),
        Validators.required
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required
      ])),
      city: new FormControl('', Validators.compose([
        Validators.required
      ])),
      zipcode: new FormControl('', Validators.compose([
        Validators.pattern("^[1-9][0-9]{5}$"),
        Validators.required
      ])),  
      province: new FormControl('', Validators.compose([
        Validators.required
      ])),
      remarks: new FormControl('', Validators.compose([
        Validators.required
      ])),  
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Failed to get api response',
      color: "danger",
      duration: 2000, 
      position: "top",
      cssClass: "toast-design"   
    });
    toast.present();
  }
  async invalid() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'no user details found',
      buttons: ['OK'],
      cssClass: "toast-design"
    });
  
    await alert.present();
  }

  userDetails(){
    if(this.user_id==null){
      this.invalid();
    }
    else{
      this.authService.UserDetails(this.user_id).then((result) => {
        this.user_details= result;
        console.log(this.user_details);
      }, (err) => {
        this.presentToast();
      });
    }    
  }

  async updateunsuccessful() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: this.profile_updated.message,
      buttons: ['OK'],
      cssClass: "alert-design"
    });
  
    await alert.present();
  }

  async signUpsuccess() {
    const toast = await this.toastController.create({
      //header: " Hello, " + this.validate_response.data.name,
      message: this.profile_updated.message,
      color: "dark",
      duration: 3000,
      position:"top",
      cssClass: "toast"
    });
    toast.present();
  }
  
  updateProfile(){
    let body = 'name='+ this.validations_form.value.name + '&email=' + this.validations_form.value.email +'&contact_no='+ this.validations_form.value.contact_no + '&address='+this.validations_form.value.address + '&city='+this.validations_form.value.city + '&province=' + this.validations_form.value.province +'&zipcode=' + this.validations_form.value.zipcode + '&remark='+ this.validations_form.value.remark ;
    this.authService.UpdateProfile(this.user_id,body).then((result) => {
      this.profile_updated = result;
      if(this.profile_updated.status==false){
        this.validations_form.reset();
        this.updateunsuccessful();
      }
      else if(this.profile_updated.status==true){
        this.signUpsuccess();
        this.router.navigate(['\profile']);
        
      }
    }, (err) => {
      this.presentToast();
    });;
  }

}
