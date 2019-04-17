import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgModule,Component, OnInit, ViewChild } from '@angular/core'


import { UserComponent } from './user.component';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import {
    ReactiveFormsModule,
    FormsModule,    
    Validators,
    FormBuilder,
    FormGroup
} from '@angular/forms';

import { AgGridModule  } from 'ag-grid-angular';

let columnDefs = [        
        {headerName: 'First Name', field: 'first_name',sortable: true ,filter: true},        
        {headerName: 'Last Name', field: 'last_name',sortable: true },
        {headerName: 'Employee Id', field: 'employee_id',sortable: true}
    ];


describe('UserComponent', () => {  
  let component: UserComponent;
  let userForm: FormGroup;
  let agGrid: AgGridModule;
  let fixture: ComponentFixture<UserComponent>;

  

 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],     
      imports: [
                   
                    ReactiveFormsModule,
                    FormsModule,
                    HttpClientModule,
                    AgGridModule.withComponents([])
                    
                ],

    })
    .compileComponents();
  }));

  
   beforeEach(() => {
        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        component.columnDefs = columnDefs;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should have expected column headers', () => {
        component.columnDefs = columnDefs;
        fixture.detectChanges();

        const elm = fixture.nativeElement;
        const grid = elm.querySelector('ag-grid-angular');
        const headerCells = grid.querySelectorAll('.ag-header-cell-text');
        const headerTitles = Array.from(headerCells).map((cell: any) =>
            cell.textContent.trim()
        );
        expect(headerTitles).toEqual(['First Name', 'Last Name']);
    });

    it('check getUsers  exists', () => {
    expect(component.getUsers()).toBeTruthy;
  }); 

   
});