import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { map, catchError } from 'rxjs/operators';
  import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
   
  @Injectable()
  export class HttpConfigInterceptor implements HttpInterceptor {
    
    loaderToShow: any;
    constructor( public loadingController:LoadingController) { }
   
   
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
      const token = "123run";
   
      //Authentication by setting header with token value
      if (token) {
        request = request.clone({
          setHeaders: {
            'Authorization': token
          }
        });
      }
   
      if (!request.headers.has('Content-Type')) {
        request = request.clone({
          setHeaders: {
            'content-type': 'application/json'
          }
        });
      }
   
      request = request.clone({
        headers: request.headers.set('Accept', 'application/json')
      });
      this.showLoader();
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('event--->>>', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.hideLoader();
          return throwError(error);
        }));
    }

    showLoader(){
        this.loaderToShow = this.loadingController.create({
            message: 'Processing Server Request'
        }).then((res) => {
            res.present();
            res.onDidDismiss().then((dis) => {
                console.log('Loading dismissed!');
            });
        });
        this.hideLoader() 
        
    }
     
    hideLoader(){
        this.loadingController.dismiss();
    }
   
   
  }