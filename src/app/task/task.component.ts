import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  users: Object;
  constructor(private data: DataService,private service: DataService) { }

  
  ngOnInit() {

    

    this.data.getUsers().subscribe(data => {
        this.users = data
        console.log(this.users);
      }
    );
    
  }

 
  firstClick() {
    this.data.firstClick();
  }

}
