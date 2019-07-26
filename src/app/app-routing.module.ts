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
  { path: 'viewdish', loadChildren: './pages/viewdish/viewdish.module#ViewdishPageModule' },
  { path: 'dishview', loadChildren: './pages/dishview/dishview.module#DishviewPageModule' },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
