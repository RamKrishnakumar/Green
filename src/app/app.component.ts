import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages =[
    {title:'Home',
     url:'/home',
    icon:'home',
    id:'1'
  },
  {
    title:'User Profile',
    url:'/profile',
    icon:'person',
    id:'2'
  },
  {
    title:'Cart',
    url:'/cart',
    icon:'cart',
    id: '3',
  },
  {
    title:'My Orders',
    url:'/myorders',
    icon:'list-box',
    id:'4'
  },
  {
    title:'Online Reservation',
    url:'/online-reservation',
    icon:'cart',
    id:'5'
  },
  {
    title:'About Us',
    url:'/about-us',
    icon:'document',
    id:'7'
  }
  // ,{
  //   title:'Logout',
  //   url: this.presentAlertConfirm(),
  //   icon:'log-out',
  //   id:'8'
  // }
];
 public user_id: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router:Router,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.user_id = JSON.parse(window.localStorage.getItem('userKey'));
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.show();
      if(this.user_id == null || this.user_id== undefined){
        this.router.navigate(['login']);
        this.splashScreen.hide();
      }
      else{
        this.router.navigate(['home']);
        this.splashScreen.hide();
      }
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.Logout();
          }
        }
        
      ]
    });

    await alert.present();
  }
  Logout(){
   this.router.navigate(['login']);
  }
}
