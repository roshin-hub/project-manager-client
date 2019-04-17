import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';



describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectComponent],
       imports: [ ReactiveFormsModule, FormsModule,HttpClientModule,Ng2SmartTableModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
        expect(component.projectForm.valid).toBeFalsy();
    });

  it('check getProjects  exists', () => {
    expect(component.getProjects()).toBeTruthy;
  });

  it('check Projects gridSettings  title', () => {
    expect(component.gridSettings.columns.title.valuePrepareFunction("1","1")).toContain("label");;
  });
 

   it('check Projects gridSettings  priority', () => {
    expect(component.gridSettings.columns.priority.valuePrepareFunction("1","1")).toContain("label");;
  });

   it('check Projects gridSettings  status', () => {
    expect(component.gridSettings.columns.status.valuePrepareFunction("1","1")).toContain("label");;
  });


  it('check create project invalid', () => {
    component.submitted =true;      
    expect(component.createProject()).toBeTruthy;
  });

  /*it('check create project', () => {
    component.submitted =true;
    this.projectForm.invalid = false
    //component.projectForm.value.invalid(false);
    component.projectForm.value.projectname= "Test";
    component.projectForm.value.projectstart= "2019-01-01T00:00:00.000Z";
    component.projectForm.value.projectend= "2019-01-01T00:00:00.000Z";
    component.projectForm.value.projectmanager= "test";
    component.projectForm.value.projectpriority= "15";
    component.projectForm.value.status= "Defined";          
    expect(component.createProject()).toBeTruthy;
  });*/

  
 
});
