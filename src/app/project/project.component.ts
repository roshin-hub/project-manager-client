import { Component, OnInit ,ViewChild } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { FormBuilder, FormGroup, Validators,FormControl  } from '@angular/forms';
import { DataService } from '../data.service';
import { Project } from '../models/project';
import { Observable, of } from 'rxjs';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
   
  projectForm: FormGroup;  
  submitted = false;
  success = false;
  resptxt = '';  
  managerlistValue: string;
  managerList:  any;  
  gridData: any;
  gridSettings: any;
  statusList: any;     

  constructor(private formBuilder: FormBuilder,private service: DataService) { 
     
     
     this.getProjects();
     const actions = {
      columnTitle: 'Actions',
      add: false,
      delete: true,
      edit: true,      
      /*custom: [
        {
          name: 'update',
          width: '20%',
          title: '<i title="Edit Detail" class="fa fa-pencil-square-o"></i>',
        }
      ],*/
      position: 'right'
    };

    this.gridSettings = {
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
          title: 'Project',
          filter: true,
          type: 'html',
          width: '20%',
          valuePrepareFunction: (cell, row) => {
            return '<label  title="' + row.title + '" >' + cell + '</label>';

          }
        },
        start_date: {
          title: 'Start Date',
          filter: true,
          type: 'html',
          width: '12%',         
          valuePrepareFunction: (cell, row) => {
            return '<label  title="' + row.start_date.slice(0, -14) + '" >' + cell.slice(0, -14) + '</label>';

          }
        },
        end_date: {
          title: 'End Date',
          filter: true,
          type: 'html',
          width: '12%',
          valuePrepareFunction: (cell, row) => {
            return '<label  title="' + row.end_date.slice(0, -14) + '" >' + cell.slice(0, -14) + '</label>';

          }
        },

        priority: {
          title: 'Priority',
          filter: true,
          type: 'html',
          width: '8%',  
          /*editor: {
            type: 'list',
            config: { list: this.statusList }
          },   */     
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
          width: '20%',
          filter:true
        },
      }
    } 

  } 

  ngOnInit() {     
    this.projectForm = this.formBuilder.group({     
      projectname: ['', Validators.required],
      projectstart: ['', Validators.required],
      projectend: ['', Validators.required],     
      projectmanager: ['', Validators.required],      
      projectpriority: ['']
      
    }); 
    
    
    this.service.getUsers().subscribe(data => {
        this.managerList = data        
      });     
  }

  createProject() {
    this.submitted = true;
        if (this.projectForm.invalid) {      
        return;
    }
    
    let project = new Project();
    project.title = this.projectForm.value.projectname;
    project.start_date = this.projectForm.value.projectstart;
    project.end_date = this.projectForm.value.projectend;   
    project.manager_id = this.projectForm.value.projectmanager;
    project.priority = this.projectForm.value.projectpriority?this.projectForm.value.projectpriority:'15';
    project.status = 'Defined'  
    
     
    this.service.createProject(project).subscribe((result) => {
        this.success = true; 
        this.getProjects();      
     }); 

} 
  getProjects() {
    this.service.getProjects().subscribe((response) => {
      this.gridData = response;
    });   
  }  

  updateProject(event) {
    
      if (confirm('Are you sure you want to update?')) {       

        let project = new Project();
        project.title = event.newData.title;
        project.start_date = event.newData.start_date;
        project.end_date = event.newData.end_date;   
        project.manager_id = event.newData.manager_id;
        project.priority = event.newData.priority;
        project.status = event.newData.status;        

        this.service.updateProject(event.data._id,project).subscribe((result) => {       
            event.confirm.resolve(event.newData);
        });         
     
    } else {
      event.confirm.reject();
    }
  }  

  deleteProject(event) {
    
    if (confirm('Are you sure you want to delete?')) {     
      this.service.deleteProject(event.data._id).subscribe((result) => {       
            event.confirm.resolve(event.data);
        });  
     
    }
    else {
     event.confirm.reject();
    }
  }

}