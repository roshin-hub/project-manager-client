import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;

  columnDefs = [
        {headerName: 'Title', field: 'title',sortable: true ,filter: true},        
        {headerName: 'Status', field: 'status',sortable: true },
        {headerName: 'Priority', field: 'priority',sortable: true}
    ];

    rowData: any;

  constructor(private formBuilder: FormBuilder,private service: DataService) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      message: ['', Validators.required]
    });

    /*fetch('https://api.myjson.com/bins/15psn9')
      .then(result => result.json())
      .then(rowData => this.rowData = rowData);*/
    
    this.service.getProjects().subscribe(data => {
        this.rowData = data        
      });

     
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
        return;
    }

    this.success = true;
}



}
