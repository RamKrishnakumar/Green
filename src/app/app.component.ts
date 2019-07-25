import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages =[
    {title:'Home',
     url:'/home',
    icon:'home'
  },
  {
    title:'Cart',
    url:'/cart',
    icon:'cart'
  },
  {
    title:'My Orders',
    url:'/myorders',
    icon:'list-box'
  },
  {
    title:'Online Reservation',
    url:'/online_reservation',
    icon:'cart'
  },
  {
    title:'Edit Profile',
    url:'/edit_profile',
    icon:'create'
  },{
    title:'About Us',
    url:'/about_us',
    icon:'document'
  },{
    title:'Logout',
    url:'/login',
    icon:'log-out'
  },
  {
    title:'Exit',
    role: 'cancel',
    icon:'exit'
  },
  {
    title:'Exit',
    role: 'cancel',
    icon:'exit'
  }
];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
