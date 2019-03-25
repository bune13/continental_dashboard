import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private apiService:ApiService) {
    this.apiService.getSSDIDashboardDataCheck().subscribe(
      (result)=>{
        console.log(result)
      },
      (error)=>{
        console.log(error)
      }
    )
    console.log("Admin Header");
   }

  ngOnInit() {
  }

}
