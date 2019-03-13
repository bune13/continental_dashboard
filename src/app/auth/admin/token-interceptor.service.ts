import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { ApiService } from '../../shared/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private apiService:ApiService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let tokenizedReq = request.clone({
      setHeaders:{
        Authorization:`Bearer ${this.apiService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
