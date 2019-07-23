import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-location-menu',
  templateUrl: './location-menu.page.html',
  styleUrls: ['./location-menu.page.scss'],
})
export class LocationMenuPage implements OnInit {
  public appPages =[
    {url: '/home'}];
  all_response:any;
  constructor(
              public router: Router,
              public toastController: ToastController,
              public alertController: AlertController
            ) { 
    this.all_response = JSON.parse(window.localStorage.getItem('key'));
  }
  //public menuType = this.all_response.location_menu;
  public location_title: any;
  ngOnInit() {
  console.log(this.all_response.location_menu.data[0].title);
  }
 }
