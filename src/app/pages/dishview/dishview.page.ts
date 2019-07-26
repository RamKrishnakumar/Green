import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dishview',
  templateUrl: './dishview.page.html',
  styleUrls: ['./dishview.page.scss'],
})
export class DishviewPage implements OnInit {
  public backPages =[
    {url: '/dishslist'}];

  constructor() { }
  dish_details_response:any;
  ngOnInit() {
  this.dish_details_response= JSON.parse(window.localStorage.getItem('dishKey'));
  }

}
