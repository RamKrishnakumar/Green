import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup , FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

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
              private toastController: ToastController) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      registeredemail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"),       
      ])),    
    });
  }
  Resetpwd(){
    console.log(this.validations_form.value);
    this.router.navigate(['\login']);
  }
  Login(){
    this.router.navigate(['\login']);
  }

}
