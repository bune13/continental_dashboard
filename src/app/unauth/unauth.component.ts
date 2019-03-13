import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauth',
  templateUrl: './unauth.component.html',
  styleUrls: ['./unauth.component.css']
})
export class UnauthComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    localStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/signin'])
    }, 4000);
  }

}
