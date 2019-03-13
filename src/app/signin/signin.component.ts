import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm:FormGroup
  forgetPassword:FormGroup
  flip:Boolean
  resetMailSend:Boolean = false;
  resetMainNotSent:boolean = false;
  errorAlert:boolean = false;
  waitText:boolean = false;
  
 

  constructor(private apiService:ApiService, private router:Router) { }

  onLogin(){
    if(this.signInForm.valid){
      console.log(this.signInForm.value);
      console.log(this.signInForm);
      this.apiService.checkUserLogin(this.signInForm.value)
      this.signInForm.reset();
      
    }
  }

  doFlip(){
    this.flip=!this.flip;
  }

  resetPassword(){
    if(this.forgetPassword.valid){
      console.log('reset your password');
      this.waitText = true;
      this.apiService.onForgetPassword(this.forgetPassword.value).subscribe(
        (result)=>{
          console.log(result)
          if(result[status] !== 404){
            this.waitText = false;
            this.resetMailSend=true;
            setTimeout(()=>{
              this.resetMailSend=false;
              this.doFlip()
            },5000)
          }
        },
        (error)=>{
          console.log("ERRRRROR",error)
          if(error.status==404){
            this.resetMainNotSent = true;
            this.waitText = false;
            setTimeout(()=>{
              this.resetMainNotSent=false;
              this.doFlip()
            },5000)
          }
        }
      );
    }
  }

  ngOnInit() {
    this.flip=false;
    this.signInForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    });
    this.forgetPassword = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
    });
  }

}
