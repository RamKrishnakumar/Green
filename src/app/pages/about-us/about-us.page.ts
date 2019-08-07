import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  locations:any;
  location_list:any;
  constructor() {
    this.location_list= JSON.parse(window.localStorage.getItem('locationKey'));
   }

  ngOnInit() {
    this.locations=this.location_list.data;
  }

}
