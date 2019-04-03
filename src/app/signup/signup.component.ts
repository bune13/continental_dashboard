import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { ApiService } from '../shared/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  regForm:FormGroup;
  okayAlert:boolean = false;
  waitAlert:boolean = false;
  errorAlert:boolean = false;

  countries:Array<string> = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

  constructor(private apiService: ApiService, private router:Router, private titleService:Title) {
    this.titleService.setTitle("Sing Up - Continental Tires")
  }

  onSubmit(){
    if(this.regForm.valid){
      console.log(this.regForm.value);
      // console.log(this.regForm);
      this.waitAlert = true;          
      this.apiService.onRegPost(this.regForm.value).subscribe(
        (result) => {
          console.log("onPreRegValidation successfully posted", result);
          this.okayAlert = true;
          this.waitAlert = false;
          this.regForm.reset();
          setTimeout((router: Router) => {
            this.router.navigate(['/signin']);
          }, 7000);          
        },
        (error) => {
          console.log('There was an error: ', error);
          this.errorAlert = true;
          this.waitAlert = false;
        },
        () => {}
      );
      
    }
  }

  onReset(){
    this.okayAlert = false;
    this.regForm.reset();
  }


  ngOnInit(){
    this.okayAlert = false;
    this.regForm = new FormGroup({
      'first_name': new FormControl(null, Validators.required),
      'last_name': new FormControl(null, Validators.required),
      'business_name': new FormControl(null, Validators.required),
      'phone': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9*$]+\d/)]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.checkNewEmailValidation.bind(this)),
      'address': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
      'country': new FormControl(null, Validators.required),
      'pincode': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9*$]+\d/)]),
      'business_type': new FormControl(null, Validators.required),
    });
  }

  // chillPill(control: FormControl) {
  //   let validatorInput = new Subject();
  //   let validatorChain= validatorInput
  //     .pipe(debounceTime(400))
  //     .pipe(distinctUntilChanged())
  //     .pipe(map(value => this.checkNewEmailValidation(value))) 
  // }

  checkNewEmailValidation(control:FormControl){
    return this.apiService.onCheckEmailTaken(control.value)
      .pipe(map(
        (res)=>{
          return res == 1 ? {'emailIsForbidden':true} :  null;
        }
      ))
  }

  

}
