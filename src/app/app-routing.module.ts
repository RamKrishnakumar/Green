import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'pwdforgot', loadChildren: './pages/pwdforgot/pwdforgot.module#PwdforgotPageModule' },
  { path: 'location-menu', loadChildren: './pages/location-menu/location-menu.module#LocationMenuPageModule' },
  { path: 'dishslist', loadChildren: './pages/dishslist/dishslist.module#DishslistPageModule' },
  { path: 'myorders', loadChildren: './pages/myorders/myorders.module#MyordersPageModule' },
  { path: 'dishview', loadChildren: './pages/dishview/dishview.module#DishviewPageModule' },  { path: 'cart', loadChildren: './pages/cart/cart.module#CartPageModule' },
  { path: 'checkoutpage', loadChildren: './pages/checkoutpage/checkoutpage.module#CheckoutpagePageModule' },
  { path: 'checkout', loadChildren: './pages/checkout/checkout.module#CheckoutPageModule' },
  { path: 'about-us', loadChildren: './pages/about-us/about-us.module#AboutUsPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'online-reservation', loadChildren: './pages/online-reservation/online-reservation.module#OnlineReservationPageModule' },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
