import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

 
  messageForm: FormGroup;
  submitted = false;
  success = false;
  resptxt = '';
  

  columnDefs = [
        {headerName: 'Title', field: 'title',sortable: true ,filter: true},        
        {headerName: 'Status', field: 'status',sortable: true },
        {headerName: 'Priority', field: 'priority',sortable: true}
    ];

    rowData: any;

  constructor(private formBuilder: FormBuilder,private service: DataService) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      title: ['', Validators.required],
      priority: ['', Validators.required]
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


    let product = new Product();
    product.title = this.messageForm.value.title;
    product.priority = this.messageForm.value.priority;  

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

    //console.log(this.messageForm.value);
    this.service.createProject(this.messageForm.value)
    //console.log(this.resptxt);
    alert('The form was submitted');
    this.service.getProjects().subscribe(data => {
        this.rowData = data        
      });
    this.messageForm.reset();

    this.success = true;

    location.reload()

    /*this.rootService.postAPIData().subscribe((response)=>{
      console.log('response from post data is ', response);
    },(error)=>{
      console.log('error during post is ', error)
    })*/


}



}
