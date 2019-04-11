import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl  } from '@angular/forms';
import { DataService } from '../data.service';
import { Product } from '../models/product';


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
   
  rowData: any;
  columnDefs = [
        {headerName: 'Title', field: 'title',sortable: true ,filter: true},        
        {headerName: 'Status', field: 'status',sortable: true },
        {headerName: 'Priority', field: 'priority',sortable: true},
        {headerName: 'Priority', field: 'projectstart',sortable: true}
    ];     
    

  constructor(private formBuilder: FormBuilder,private service: DataService) { 
    
    
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
    this.service.getProjects().subscribe(data => {
        this.rowData = data        
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
    
     /*this.orderSvc.addItemToCart(cartItem).subscribe((res: OrderProduct) => {
      if (res instanceof AppError) {
        this.showError(res.message);
        return;
      }
      else
        this.router.navigateByUrl('/authenticated/cart');      
    }, err => {
      this.showError('Failed to add item to the cart!');
      console.log(err);
    }); */   
    /*this.orderSvc.addItemToCart(cartItem).subscribe((res: OrderProduct) => {
      if (res instanceof AppError) {
        this.showError(res.message);
        return;
      }
      else
        this.router.navigateByUrl('/authenticated/cart');      
    }, err => {
      this.showError('Failed to add item to the cart!');
      console.log(err);
    }); */   

    //console.log(this.projectForm.value);
    this.service.createProject(this.projectForm.value)
    //console.log(this.resptxt);
    alert('The form was submitted');
    this.service.getProjects().subscribe(data => {
        this.rowData = data        
      });
    this.projectForm.reset();

    this.success = true;

    location.reload()

    /*this.rootService.postAPIData().subscribe((response)=>{
      console.log('response from post data is ', response);
    },(error)=>{
      console.log('error during post is ', error)
    })*/


}

public saveCode(e): void {
    let name = e.target.value;
    let list = this.managerList.filter(x => x.name === name)[0];
    console.log(list.id);
  }



}
