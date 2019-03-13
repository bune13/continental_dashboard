import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../admin.service';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http'
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-admin-call',
  templateUrl: './admin-call.component.html',
  styleUrls: ['./admin-call.component.css']
})
export class AdminCallComponent implements OnInit {
  selectedFile:File = null;
  uploadProgress:number;
  uploadProgressCompleted:string;
  showProgressBar:boolean = false;
  showDatatable:boolean = false;

  lists:any[];
  callAllList:any[] = []

  dataTable: any;

  constructor(private adminService:AdminService, private http: HttpClient, private router:Router, private httpClient: HttpClient, private chRef: ChangeDetectorRef) { }

  api_url:string = this.adminService.api_url
  downloadApiLink:string = this.api_url+"download_template"
  uploadApiLink:string = this.api_url+"upload"

  ngOnInit() {
    this.adminService.getAllCallLists().subscribe(
      (data: any[]) => {
        // table.destroy();
        console.log(data);
        this.showDatatable = true
        this.lists = JSON.parse(data['result'])
        this.lists.forEach((q)=> {
          // console.log(q)
          // console.log(q["Phone number"]["body"])
          this.callAllList.push(q["Phone number"]["body"])
          // console.log(this.callAllList)
        })
        // for (let q of this.lists) {
        //   this.callAllList.push(q['Phone Number']['ph'])
        // }
        this.chRef.detectChanges()
        const table: any = $('table')
        this.dataTable = table.DataTable()
      },
      (err)=>{
        console.log(err);
        this.showDatatable = false
      },
      ()=>{}
    );
  }

  onDownloadTemplate(){
    this.adminService.downloadTemplate();
  }

  onFileSelected(e){
    this.selectedFile = e.target.files[0]
    console.log(this.selectedFile)
  }

  onUpload(){
    
    const fd = new FormData();
    fd.append('template', this.selectedFile, this.selectedFile.name)
    this.httpClient.post(`${this.api_url}upload`, fd, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(
      (event)=>{
        this.showProgressBar = true;

        if(event.type === HttpEventType.UploadProgress){
          console.log('Upload Progress: ' + Math.round(event.loaded/event.total*100)+'%')
          this.uploadProgress = Math.round(event.loaded/event.total*100)
          this.uploadProgressCompleted = String(this.uploadProgress)+"%"
          if(this.uploadProgress == 100){
            this.uploadProgressCompleted = "Completed"
          }
          console.log(this.uploadProgress)
        } else if(event.type === HttpEventType.Response){
          console.log(event)
        }

        setTimeout(() => {
          this.showProgressBar = false;
        }, 2000);

        
      },
      (err)=>{
        if(err.status != 200){
          this.router.navigate(['/unauth'])
        }
      },
      ()=>{}
    );    
  }

  onClickCallToUser(number){
    this.adminService.callSingleUser(number).subscribe(
      (res)=>{
        console.log(res)
      },
      (err)=>{
        console.log(err)
      },
      ()=>{}
    );
  }

  onClickCallToAllUser(){

    this.callAllList.forEach((singleNumber)=>{
      this.adminService.callSingleUser(singleNumber).subscribe(
        (res)=>{
          console.log(res)
        },
        (err)=>{
          console.log(err)
        },
        ()=>{}
      );
    })
    
  }

}
