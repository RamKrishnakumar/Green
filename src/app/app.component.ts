import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
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
    title:'Cart',
    url:'/cart',
    icon:'cart',
    id: '2',
  },
  {
    title:'My Orders',
    url:'/myorders',
    icon:'list-box',
    id:'3'
  },
  {
    title:'Online Reservation',
    url:'/online_reservation',
    icon:'cart',
    id:'4'
  },
  {
    title:'Edit Profile',
    url:'/edit_profile',
    icon:'create',
    id:'5'
  },{
    title:'About Us',
    url:'/about-us',
    icon:'document',
    id:'6'
  },{
    title:'Logout',
    url:'/login',
    icon:'log-out',
    id:'7'
  },
  {
    title:'Exit',
    role: 'cancel',
    icon:'exit',
    id:'8'
  }
];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router:Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.show();
    });
  }
}
