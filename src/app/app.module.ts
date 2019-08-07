import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AuthService } from '../app/services/auth.service';
import { CartserviceService } from '../app/services/cartservice.service';
import { HttpModule } from '@angular/http';
//import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule  } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PayPal } from '@ionic-native/paypal/ngx';
import { HTTP_INTERCEPTORS , HttpClientModule } from '@angular/common/http';
import { HttpConfigInterceptor } from '../../src/app/interceptor/httpconfig.interceptor';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,ReactiveFormsModule, FormsModule, HttpModule, HttpClientModule,IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,AuthService,CartserviceService,PayPal,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HTTP_INTERCEPTORS,
     useClass: HttpConfigInterceptor,
     multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
