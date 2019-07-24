import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Http } from '@angular/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dishslist',
  templateUrl: './dishslist.page.html',
  styleUrls: ['./dishslist.page.scss'],
})
export class DishslistPage implements OnInit {

  public backPages =[
    {url: '/dishslist'}];
  set_response:any;

  constructor(public router:Router,
              public http: Http,
              public toastController: ToastController,
              ) {
  this.set_response = JSON.parse(window.localStorage.getItem('menuKey'));
  }

  ngOnInit() {

  }

  goBack(){  
    this.router.navigate(['\location-menu']);
  }

}
