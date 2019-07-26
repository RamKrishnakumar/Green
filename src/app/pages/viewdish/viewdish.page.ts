import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewdish',
  templateUrl: './viewdish.page.html',
  styleUrls: ['./viewdish.page.scss'],
})
export class ViewdishPage implements OnInit {

  public backPages =[
    {url: '/myorders'}];

  constructor() { }

  ngOnInit() {
  }

}
