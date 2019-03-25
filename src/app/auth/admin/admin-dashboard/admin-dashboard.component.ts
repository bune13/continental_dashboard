import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  pleaseWaitBlink:boolean = false

  constructor() { }

  ngOnInit() {
  }

  // ---------------- line chart ----------------

  public lineChartData:Array<any> = [
    { data: [75, 45, 34, 62, 43, 33, 49, 75, 30, 88, 90, 54], label: '2017'} ,
    { data: [65, 59, 45, 81, 56, 55, 40, 80, 81, 56, 55, 40], label: '2018'} ,
    { data: [55, 79, 40], label: '2019'} ,
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
      borderColor: '#d66161',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
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

  public doughnutChartLabels:string[] = ['Steel', 'Alloy', 'Unclassified', 'Spider', 'Air', 'Solid Polyurethane Elastomer'];
  public doughnutChartData:number[] = [284749, 117618, 335845, 647, 1520, 199];
  public doughnutChartType:string = 'doughnut';

  private donutColors=[
    {
      backgroundColor: ['rgba(110, 114, 20, 1)',
                        'rgba(118, 183, 172, 1)',
                        'rgba(0, 148, 97, 1)',
                        'rgba(129, 78, 40, 1)',
                        'red',
                        '#00d'
                      ],
      borderColor: 'rgb(103, 58, 183, 0.0)',
      // pointBackgroundColor: 'rgb(103, 58, 183)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      // pointHoverBorderColor: 'rgba(103, 58, 183, .8)',
      borderWidth:'0'
    }
  ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
