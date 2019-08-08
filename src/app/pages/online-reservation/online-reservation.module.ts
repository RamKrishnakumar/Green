import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OnlineReservationPage } from './online-reservation.page';

const routes: Routes = [
  {
    path: '',
    component: OnlineReservationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OnlineReservationPage]
})
export class OnlineReservationPageModule {}
