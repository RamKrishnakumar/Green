import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-menu',
  templateUrl: './location-menu.page.html',
  styleUrls: ['./location-menu.page.scss'],
})
export class LocationMenuPage implements OnInit {
  all_response:any;
  constructor() { 
    this.all_response = JSON.parse(window.localStorage.getItem('key'));
  }
  //public menuType = this.all_response.location_menu;
  public location_title: any;
  ngOnInit() {
    
  }
 

}
