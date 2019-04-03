import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-logged-out',
  templateUrl: './logged-out.component.html',
  styleUrls: ['./logged-out.component.css']
})
export class LoggedOutComponent implements OnInit {

  constructor(private router:Router, private titleService:Title) {
    this.titleService.setTitle("Logging Out - Continental Tires")
  }

  ngOnInit() {
    setTimeout((
      ()=>{
        this.router.navigate(['/signin']);
      }
    ),2000)
  }

}
