import { Component, OnInit } from '@angular/core';
import { PickerController, AlertController, ToastController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-online-reservation',
  templateUrl: './online-reservation.page.html',
  styleUrls: ['./online-reservation.page.scss'],
})
export class OnlineReservationPage implements OnInit {
  location = 'Select Location';
  location_id: any;
  booking_confirm_success:any;
  validations_form: FormGroup;
  errorMessage:string='';

  validation_messages= {
    'f_name': [
      {type: 'required',message:'First Name is required'}
    ],
    'l_name': [
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
    'seats':[
      {type: 'required',message:'Please provide No. of seats required'},
    ],
    'address':[
      {type: 'required',message:'Address is required'},
    ],
    'zipcode':[
      {type: 'required',message:'Please Enter Zipcode'},
      {type: 'pattern', message: 'Zipcode should be in correct format'}
    ],
    'province':[
      {type: 'required',message:'Province is required'},
    ],
    'info':[
      {type: 'required',message:'Provide some information for your required arrangements'},
    ],
  };

  constructor(private pickerCtrl: PickerController,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              public alertController: AlertController,
              public toastController: ToastController) { }
 
  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      f_name: new FormControl('', Validators.compose([
        Validators.required,     
      ])),
      l_name: new FormControl('', Validators.compose([
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
      seats: new FormControl('', Validators.compose([
        Validators.required
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required
      ])),
      zipcode: new FormControl('', Validators.compose([
        Validators.pattern("^[1-9][0-9]{5}$"),
        Validators.required
      ])),  
      province: new FormControl('', Validators.compose([
        Validators.required
      ])),
      info: new FormControl('', Validators.compose([
        Validators.required
      ])),  
    });
  }
  async showBasicPicker(){
    let opts: PickerOptions = {
      buttons: [
        {text: 'Cancel',
         role: 'cancel'
        },
        {
          text:'Done'
        }

      ],
      columns:[
        {
          name:'location',
          options:[
            {text: '17 AveSW Green Chili', value: '1'},
            {text: '151 Walden Green Chili', value: '2'},
            {text: '2128 Crowfoot Green Chili', value: '3'},
            {text: '150 Crowchild Green Chili', value: '4'},
            {text: '7 Mahogany SE Green Chili', value: '5'}
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then( async data => {
     let col= await picker.getColumn('location');
     this.location_id=col.options[col.selectedIndex].value
     console.log(this.location_id);
     this.location = col.options[col.selectedIndex].text;
    });
  }

  async bookingUnsuccessful() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: this.booking_confirm_success.message,
      buttons: ['OK'],
      cssClass: "alert-design"
    });
  
    await alert.present();
  }

  async bookingSuccess() {
    const toast = await this.toastController.create({
      //header: " Hello, " + this.validate_response.data.name,
      message: this.booking_confirm_success.message,
      color: "dark",
      duration: 3000,
      position:"top",
      cssClass: "toast"
    });
    toast.present();
  }

  async connectionFailed() {
    const toast = await this.toastController.create({
      //header: " Hello, " + this.validate_response.data.name,
      message: this.booking_confirm_success.message,
      color: "dark",
      duration: 3000,
      position:"top",
      cssClass: "toast"
    });
    toast.present();
  }

  onlineReservation(){
    
    if(this.location_id==undefined){
      this.location_id='';
      let body = 'location_id='+ this.location_id + '&f_name='+ this.validations_form.value.f_name+ '&l_name='+ this.validations_form.value.l_name + '&email=' + this.validations_form.value.email +'&mobile='+ this.validations_form.value.contact_no + '&address='+this.validations_form.value.address + '&no_of_sheet='+this.validations_form.value.seats + '&province=' + this.validations_form.value.province +'&zip=' + this.validations_form.value.zipcode + '&info='+ this.validations_form.value.info ;
      this.authService.OnlineReservation(body).then((result) => {
        this.booking_confirm_success= result;
        if(this.booking_confirm_success.status==false){
         this.bookingUnsuccessful();
        }
        else if(this.booking_confirm_success.status==true){
          this.bookingSuccess();
          this.validations_form.reset();
        }
        },(err) => {
          this.connectionFailed();
        });
    }
    else if(this.location_id!==undefined){
      let body = 'location_id='+ this.location_id + '&f_name='+ this.validations_form.value.f_name+ '&l_name='+ this.validations_form.value.l_name + '&email=' + this.validations_form.value.email +'&mobile='+ this.validations_form.value.contact_no + '&address='+this.validations_form.value.address + '&no_of_sheet='+this.validations_form.value.seats + '&province=' + this.validations_form.value.province +'&zip=' + this.validations_form.value.zipcode + '&info='+ this.validations_form.value.info ;
      this.authService.OnlineReservation(body).then((result) => {
        this.booking_confirm_success= result;
        if(this.booking_confirm_success.status==false){
         this.bookingUnsuccessful();
        }
        else if(this.booking_confirm_success.status==true){
          this.bookingSuccess();
          this.validations_form.reset();
        }
        },(err) => {
          this.connectionFailed();
        });
    }
    
  }

}
