import { Component, OnInit ,ViewChild } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { FormBuilder, FormGroup, Validators,FormControl  } from '@angular/forms';
import { DataService } from '../data.service';
import { Product } from '../models/product';
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

  constructor(private formBuilder: FormBuilder,private service: DataService) { 
     this.getProjectList();
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
          width: '15%',
          valuePrepareFunction: (cell, row) => {
            return '<label  title="' + row.start_date + '" >' + cell + '</label>';

          }
        },
        end_date: {
          title: 'End Date',
          filter: true,
          type: 'html',
          width: '15%',
          valuePrepareFunction: (cell, row) => {
            return '<label  title="' + row.end_date + '" >' + cell + '</label>';

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
          width: '25%',
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
      projectpriority: ['', Validators.required],
      projectmanager: ['', Validators.required],
      projectmanagerid: ['', Validators.required]
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


    let product = new Product();
    product.title = this.projectForm.value.title;
    product.priority = this.projectForm.value.priority;  

    this.service.createProject(product).subscribe((result) => {
    console.log("This code will be executed when the HTTP call returns successfully")
     });
    
     
    this.service.createProject(this.projectForm.value)
    //console.log(this.resptxt);
    alert('The form was submitted');
    
    this.projectForm.reset();

    this.success = true;

    location.reload()

   


}
getProjectList() {
    this.service.getProjects().subscribe((response) => {
      this.gridData = response;
    });   
  }

/*selectRow(event) {
    if (event.isSelected == true) {
      this.VmdDetail.update = false;
      let vmdID = event.data.id;
      this.getVmdById(vmdID);
    }
  }

  Update(event) {
    let vmdID = event.data.id;
    if (event.action == "update") {
      this.getVmdById(vmdID);
      this.VmdDetail.update = true;
      this.openModal();
    }
    else if (event.action == "KibanaDashboard") {
      if (event.data.metadata != null && 'kibana_url' in event.data.metadata && 'kibana_index' in event.data.metadata) {
        let urlArray = ((event.data.metadata.kibana_url).toString()).split('/');
        let endpoint = urlArray[0] + "//" + urlArray[2];
        let kibanaURL = endpoint + "/app/kibana#/discover??_g=()&_a=(columns:!(KPI_Name,KPI_Type,KPI_status,Component,Env_Type,Eqp_Name),index:" + event.data.metadata.kibana_index + ",interval:auto,query:(match_all:()),sort:!('@timestamp',desc))";
        window.open(kibanaURL, "_blank");
      }
      else {
        this.toastr.warning("Kibana Dashboard Is Not Configured For VMD " + event.data.name);
      }
    }

  }*/

  onCustomDelete(event) {
    //let vmdID = event.data.id;
    if (confirm('Are you sure you want to delete?')) {
      //this.deleteVMD(vmdID);
      //this.getVmdList();
    }
    else {
     event.confirm.reject();
    }
  }

  onEditConfirm(event) {
    
      if (confirm('Are you sure you want to update?')) {
      //call to remote api, remember that you have to await this
      //event.confirm.resolve(event.newData);

      var data = {"name" : event.newData.employee_name,
                "salary" : event.newData.employee_salary,
                "age" : event.newData.employee_age,
                "id" : event.newData.id
                };
    /*this.http.put<Employee>('/api/v1/update/'+event.newData.id, data).subscribe(
        res => {          
          event.confirm.resolve(event.newData);
      }
      );*/
    } else {
      event.confirm.reject();
    }
  }  

}