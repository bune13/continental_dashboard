import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // ---------------- line chart ----------------

  public lineChartData:Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40], label: '2017'} ,
    { data: [28, 48, 40, 19, 86, 27, 90, 40, 19, 86, 27, 90], label: '2018'} ,
    // [1, 54, 48, 79, 9, 58, 5, 48, 79, 9, 58, 5],
    // [1, 54, 48, 34, 9, 58, 25, 48, 49, 9, 58, 5]
  ];
  public lineChartLabels:Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public lineChartOptions:any = {
    responsive: true,
    tooltips: {
      mode: 'nearest'
    },
    // title: {
    //   display: true,
    //   text: 'Custom Chart Title'
    // },
    legend: {
      position: 'bottom',
      // display: false,
      labels: {
          fontColor: '#fff',
          boxWidth: 20,
          fontStyle: 'bold',
          fontSize: 16,          
      }
    },
    elements:{
      line:{
        tension: 0,
        labels:{
          fontColor:'#fff'
        }
      }
    }
  };
  public lineChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(148,159,177,0)',
      borderColor: '#007bff',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: 'rgba(148,159,177,0)',
      borderColor: '#00ff80',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  // ---------------- doughnut ----------------

  public doughnutChartLabels:string[] = ['Desktop', 'Mobile', 'Others'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
