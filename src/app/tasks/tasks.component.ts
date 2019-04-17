import { Component, OnInit ,ViewChild } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { FormBuilder, FormGroup, Validators,FormControl  } from '@angular/forms';
import { DataService } from '../data.service';
import { Task } from '../models/task';
import { Observable, of } from 'rxjs';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  taskgridData: any;
  taskgridSettings: any;      

  constructor(private formBuilder: FormBuilder,private service: DataService) {     
     
     this.getTasks();
     const actions = {
      columnTitle: 'Actions',
      add: false,
      delete: true,
      edit: true,       
      position: 'right'
    };

    this.taskgridSettings = {
      edit: {
        editButtonContent: '<i title="Edit Detail" class="fa fa-pencil-square-o"></i>',
        confirmSave: true
      },
     
      delete: {
        deleteButtonContent: '<i title=Delete class="fa fa-trash"></i>',
        confirmDelete: true
      },
      actions: actions,
      hideSubHeader: false,
      columns: {

        title: {
          title: 'Task',
          filter: true,
          type: 'html',
          width: '12%',
          valuePrepareFunction: (cell, row) => {
            return '<label  title="' + row.title + '" >' + cell + '</label>';

          }
        },
        parent_id: {
          title: 'Parent Task',
          filter: true,
          type: 'html',
          width: '12%',
          valuePrepareFunction: (cell, row) => {
            return '<label  title="' + row.parent_id + '" >' + cell + '</label>';

          }
        },
       
        project_id: {
          title: 'Project',
          filter: true,
          type: 'html',
          width: '12%',
          valuePrepareFunction: (cell, row) => {
            return '<label  title="' + row.project_id + '" >' + cell + '</label>';

          }
        },
        start_date: {
          title: 'Start Date',
          filter: true,
          type: 'html',
          width: '10%',         
          valuePrepareFunction: (cell, row) => {
            return '<label  title="' + row.start_date.slice(0, -14) + '" >' + cell.slice(0, -14) + '</label>';

          }
        },
        end_date: {
          title: 'End Date',
          filter: true,
          type: 'html',
          width: '10%',
          valuePrepareFunction: (cell, row) => {
            return '<label  title="' + row.end_date.slice(0, -14) + '" >' + cell.slice(0, -14) + '</label>';

          }
        },

        priority: {
          title: 'Priority',
          filter: true,
          type: 'html',
          width: '8%',             
          valuePrepareFunction: (cell, row) => {            
              return '<label  title="' + row.priority + '" >' + cell + '</label>';

          }
        },      
           
        status: {
          title: 'Status',
          filter: true,
          type: 'html',
          width: '10%',          
          valuePrepareFunction: (cell, row) => {            
              return '<label  title="' + row.status + '" >' + cell + '</label>';

          }
        },        
         _id: {
          title: 'Unique ID', 
          editable: false,         
          width: '15%',
          filter:true
        },
      }
    } 

  } 

  ngOnInit() {     
    
      
  } 
  getTasks() {
    this.service.getTasks().subscribe((response) => {
      this.taskgridData = response;
    });   
  }  

  updateTask(event) {
    
      if (confirm('Are you sure you want to update?')) {       

        let task = new Task();
        task.title = event.newData.title;
        task.start_date = event.newData.start_date;
        task.end_date = event.newData.end_date;   
        task.user_id = event.newData.user_id;
        task.project_id = event.newData.project_id;
        task.is_parent = event.newData.is_parent;
        task.parent_id = event.newData.parent_id;
        task.priority = event.newData.priority;
        task.status = event.newData.status;        

        this.service.updateTask(event.data._id,task).subscribe((result) => {       
            event.confirm.resolve(event.newData);
        });        
     
    } else {
      event.confirm.reject();
    }
  }  

  deleteTask(event) {
    
    if (confirm('Are you sure you want to delete?')) {     
      this.service.deleteTask(event.data._id).subscribe((result) => {       
            event.confirm.resolve(event.data);
        });  
     
    }
    else {
     event.confirm.reject();
    }
  }

}
