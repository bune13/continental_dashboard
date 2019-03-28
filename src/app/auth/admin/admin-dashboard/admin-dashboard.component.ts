import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { randomColor } from 'randomcolor'
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import 'chart.piecelabel.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, Color, BaseChartDirective, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  pleaseWaitBlinkPieChart:boolean = true
  pleaseWaitBlinkReasonChart:boolean = true

  public doughnutChartLabels: Label[] = [];
  public doughnutChartData:MultiDataSet = [];
  public doughnutChartType:ChartType = 'doughnut'
  public elem:any;
  public elem1:any;
  public pieColors:string[] = []
  public staticYellow:string = "#e67e22"

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'horizontalBar'
  public barChartLegend = false;
  public reasonsData:number[] = []
  public reasonsBarColors:string[] = []

  constructor(private apiService: ApiService) {
    this.onStartOfPage()
  }

  ngOnInit() {
  }  

  onStartOfPage(){
    console.log("Hey Start Page on")
    this.apiService.onBarReasons().subscribe(
      (result)=>{
        this.pleaseWaitBlinkReasonChart = false
        console.log(result)
               
        result.forEach(element => {
          // element['reason'] !== null ? this.elem1 = element['reason'] : this.elem1 = "Unclassified"
          // this.barChartLabels.push(this.elem1)
          // this.reasonsData.push(element['number'])
          if(element['reason'] !== null){
            this.barChartLabels.push(element['reason'])
            this.reasonsData.push(element['number'])
            // this.reasonsBarColors.push(randomColor({
            //   luminosity: 'light',
            //   format: 'rgba',
            //   alpha: 0.9
            // }))
            this.reasonsBarColors.push(this.staticYellow)
          }
          // console.log(this.reasonsBarColors)
        })
      },
      (error)=>{
        console.log(error)
      }
    )


    this.apiService.onDoughnutRimtype().subscribe(
      (result)=>{
        console.log(result)
        this.pleaseWaitBlinkPieChart = false
        result.forEach(element => {
          element['rimtype'] !== null ? this.elem = element['rimtype'] : this.elem = "Unclassified"
          this.doughnutChartLabels.push(this.elem)
          this.doughnutChartData.push(element['number'])
          this.pieColors.push(randomColor({
            hue: 'red',
            luminosity: 'light',
            format: 'rgba',
            alpha: 0.9
          }))
          console.log(this.elem)
        });
      },
      (error)=>{
        console.log(error)
      }
    )
  }  

  // ---------------- line chart ----------------

  public lineChartData:ChartDataSets[] = [
    { data: [75, 45, 34, 62, 43, 33, 49, 75, 30, 88, 90, 54], label: '2017'} ,
    { data: [65, 59, 45, 81, 56, 55, 40, 80, 81, 56, 55, 40], label: '2018'} ,
    { data: [55, 79, 40], label: '2019'} ,
    // [1, 54, 48, 79, 9, 58, 5, 48, 79, 9, 58, 5],
    // [1, 54, 48, 34, 9, 58, 25, 48, 49, 9, 58, 5]
  ];
  public lineChartLabels:Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
  private donutColors=[
    {
      backgroundColor: this.pieColors,
      borderColor: 'rgb(103, 58, 183, 0.0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      borderWidth:'0'
    }
  ];

  public doughnutChartOptions: any = {
    pieceLabel: {
      render: function (args) {
        const label = args.label,
              value = args.value;
        return label + ': ' + value;
      }
    }
  }
 
  // ---------------- Bar Chart ----------------
  public barChartOptions: any = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{
      // stacked: true
    }], yAxes: [{
      // stacked: true
    }] },
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
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartData: ChartDataSets[] = [
    { data: this.reasonsData, label: 'Reasons' }
  ];
  public chartColors: Array<any> = [
    { // first color
      backgroundColor: this.reasonsBarColors
    }
  ];


  

  // events
  public chartClicked(e:any):void {
    // console.log(e);
  }

  public chartHovered(e:any):void {
    // console.log(e);
  }





}
