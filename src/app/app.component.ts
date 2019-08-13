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
  },{
    title:'Logout',
    url:'/login',
    icon:'log-out',
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
