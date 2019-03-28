import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
// import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // @ViewChild(AdminDashboardComponent) private childAdminDashboard: AdminDashboardComponent

  constructor() {
  }

  ngOnInit() {    
  }

  onAfterViewInit(){
    // this.childAdminDashboard.onStartOfPage()
  }

}
