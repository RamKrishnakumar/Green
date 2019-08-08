import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user_id;
  public user_details:any;
  user_profile
  constructor(public authService: AuthService,
              public toastController:ToastController,
              public alertController:AlertController,
              public router: Router,
              public loadingController: LoadingController) { 
              }

  ngOnInit() {
    
    this.user_id = JSON.parse(window.localStorage.getItem('userKey'));
    this.userDetails();
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


  editProfile(){
    this.router.navigate(['edit-profile']);
  }

}
