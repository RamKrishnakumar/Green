import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PasswordValidator } from '../../validators/password.validator';

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
    'mobilenumber' : [
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
    // 'remarks' : [
    //   {type: 'required', message:'Remarks is required'},
    // ],
    'enterpassword':[
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
              private toastController: ToastController
  ) { }

  ngOnInit() {

    this.matching_passwords_group = new FormGroup({
      enterpassword: new FormControl('', Validators.compose([
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
      mobilenumber: new FormControl('', Validators.compose([
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
      matching_passwords: this.matching_passwords_group,
    });
  }

  login(){
    this.router.navigate(['\login']);
  }
}
