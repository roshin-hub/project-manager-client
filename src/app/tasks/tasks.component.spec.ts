import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksComponent ],
      imports: [ HttpClientModule,Ng2SmartTableModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('check gettasks  exists', () => {
    expect(component.getTasks()).toBeTruthy;
  });

  it('check Tasks gridSettings  title', () => {
    expect(component.taskgridSettings.columns.title.valuePrepareFunction("1","1")).toContain("label");;
  });
 

   it('check Tasks gridSettings  priority', () => {
    expect(component.taskgridSettings.columns.priority.valuePrepareFunction("1","1")).toContain("label");;
  });

  it('check Tasks gridSettings  parent_id', () => {
    expect(component.taskgridSettings.columns.parent_id.valuePrepareFunction("1","1")).toContain("label");;
  });

  it('check Tasks gridSettings  project_id', () => {
    expect(component.taskgridSettings.columns.project_id.valuePrepareFunction("1","1")).toContain("label");;
  });

  it('check Tasks gridSettings  status', () => {
    expect(component.taskgridSettings.columns.status.valuePrepareFunction("1","1")).toContain("label");;
  });

   

  

});
