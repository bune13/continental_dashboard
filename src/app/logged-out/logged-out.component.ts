import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-out',
  templateUrl: './logged-out.component.html',
  styleUrls: ['./logged-out.component.css']
})
export class LoggedOutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    setTimeout((
      ()=>{
        this.router.navigate(['/signin']);
      }
    ),2000)
  }

}
