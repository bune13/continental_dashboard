import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, delay, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService{
  api_url:string="http://127.0.0.1:5000/"
  // api_url:string="http://192.168.0.175:5000/"
  validEmail:number
  token:string = null
  errorAlert:boolean = false

  constructor(private httpClient:HttpClient, private router:Router) { }

  getMainLink(){
    return this.api_url
  }

  onRegPost(value){
    return this.httpClient.post(`${this.api_url}register`, value, httpOptions)
  }

  onCheckEmailTaken(email:string):Observable<any>{
    // console.log('INTO Check Email Taken')
    return this.httpClient.post(`${this.api_url}emailvalidation`, email, httpOptions)
      .pipe(debounceTime(2000))
      .pipe(delay(2000))
      .pipe(map(res=>res))
  }

  checkUserLogin(value){
    console.log('INTO Check User Credentials');
    return this.httpClient.post(`${this.api_url}login`, value, httpOptions).subscribe(
      (result)=>{
        if(result['Found'] && result['access_token'] !== null){
          console.log(result)
          this.router.navigate(['/admin'])
          this.token = result['access_token']
          this.setSession(this.token)
        }
      },
      (error)=>{
        this.errorAlert = true
        setTimeout(() => {
          this.errorAlert = false
        }, 5000);
        console.log(error)
      }
    )
  }

  onCheckAuth(){
    // console.log('on check')
    return this.httpClient.post(`${this.api_url}checkprotected`, this.token, httpOptions).subscribe(
      (result)=>{
          console.log(result)
      },
      (error)=>{
        console.log(error)
      }
    )
  }  

  onForgetPassword(value){
    // console.log('Into Forget Password')
    return this.httpClient.post(`${this.api_url}forgetpassword`, value, httpOptions)
  }
  
  private setSession(authResult) {
    localStorage.setItem('id_token', authResult)
  }

  public getToken(){
    return localStorage.getItem('id_token')
  }

  onLogoutService(){
    this.router.navigate(['/loggedout'])
    this.token = null
    localStorage.removeItem("id_token")
    // console.log("token", this.token)
  }

  isAuthenticatedService(){
    // return this.token != null
    return localStorage.getItem('id_token') != null
  }

}
