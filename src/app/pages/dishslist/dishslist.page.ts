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
  dishData:any;
  
  
  dish_image:any;
  

  constructor(public router:Router,
              public http: Http,
              public toastController: ToastController,
              ) {
  this.set_response = JSON.parse(window.localStorage.getItem('menuKey'));
  }
  ngOnInit() {
    this.dishData = this.set_response.menu_list.data;
    this.dish_image=this.set_response.menu_list.image_link
  }
  
  goBack(){  
    this.router.navigate(['\location-menu']);
  }

}
