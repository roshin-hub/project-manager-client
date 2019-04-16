import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl  } from '@angular/forms';
import { DataService } from '../data.service';
import { Task } from '../models/task';
import { Observable, of } from 'rxjs';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskForm: FormGroup;  
  submitted = false;
  success = false;
  resptxt = '';  
  userList:  any;  
  projectList: any;   
  taskList: any;  

  constructor(private formBuilder: FormBuilder,private service: DataService) {     

  } 

  ngOnInit() {     
    this.taskForm = this.formBuilder.group({     
      taskname: ['', Validators.required],
      taskstart: ['', Validators.required],
      taskend: ['', Validators.required],     
      username: ['', Validators.required],
      projecttxt: ['', Validators.required],      
      taskpriority: [''],
      parenttask: ['']
      
    }); 
    
    
    this.service.getUsers().subscribe(userdata => {
        this.userList = userdata        
      });

    this.service.getProjects().subscribe((projdata) => {
      this.projectList = projdata;
    });

    this.service.getTasks().subscribe((taskdata) => {
      this.taskList = taskdata;
    });          
  }

  createTask() {
    this.submitted = true;
        if (this.taskForm.invalid) {      
        return;
    }
    
    let task = new Task();
    task.title = this.taskForm.value.taskname;
    task.start_date = this.taskForm.value.taskstart;
    task.end_date = this.taskForm.value.taskend;   
    task.user_id = this.taskForm.value.username;
    task.project_id = this.taskForm.value.projecttxt;
    task.parent_id = this.taskForm.value.parenttask?this.taskForm.value.parenttask:'';
    task.is_parent = this.taskForm.value.is_parent?this.taskForm.value.is_parent:'0';
    task.priority = this.taskForm.value.taskpriority?this.taskForm.value.taskpriority:'15';
    task.status = 'Defined' 
    
     
    this.service.createTask(task).subscribe((result) => {
        this.success = true; 
          
     }); 

} 
  

  
}
