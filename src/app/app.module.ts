import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ViewChild , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule,MatInputModule} from '@angular/material';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TasksComponent } from './tasks/tasks.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProjectComponent,
    TaskComponent,
    UserComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    AgGridModule.withComponents([]),
    Ng2SmartTableModule,    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
