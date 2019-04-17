import { Injectable, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ServerConfig } from '../environments/environment';
import { AppError } from './models/app.error';
import { Project } from './models/project';
import { User } from './models/user';
import { Task } from './models/task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  server = new ServerConfig();
  appError: AppError = new AppError();

  constructor(private http: HttpClient) { }

   firstClick() {
    return console.log('clicked');
  }  

  getProjects(): Observable<any | AppError> {
    return this.http.get<any>(this.server.url + '/project')
      .pipe(          
        catchError(err => this.appError.handleError(err))
      );
  }   
  

  createProject(project: Project): Observable<Project | AppError> {   
    
    return this.http.post<Project>(this.server.url+'/project/create', project, httpOptions)
     .pipe(             
        
        catchError(err => this.appError.handleError(err))        
      );
      
  } 

   updateProject(projectId: string,project: Project): Observable<Project | AppError> {       
    return this.http.put<Project>(this.server.url+'/project/'+projectId+'/update', project, httpOptions)
     .pipe(             
       
        catchError(err => this.appError.handleError(err))        
      );
      
  } 

   deleteProject(projectId: string): Observable<Project | AppError> {      
    return this.http.delete<any>(this.server.url+'/project/'+projectId+'/delete')
     .pipe(             
        
        catchError(err => this.appError.handleError(err))        
      );
      
  } 


  createUser(user: User): Observable<User | AppError> {
      
    return this.http.post<User>(this.server.url+'/user/create', user, httpOptions)
     .pipe(         
        catchError(err => this.appError.handleError(err))        
      );
      
  }  
  
  getUsers(): Observable<any | AppError> {
    return this.http.get<any>(this.server.url + '/user')
      .pipe(          
        catchError(err => this.appError.handleError(err))
      );
  } 

  createTask(task: Task): Observable<Task | AppError> {   
    
    return this.http.post<Task>(this.server.url+'/task/create', task, httpOptions)
     .pipe(         
        catchError(err => this.appError.handleError(err))        
      );
      
  }

  getTasks(): Observable<any | AppError> {
    return this.http.get<any>(this.server.url + '/task')
      .pipe(          
        catchError(err => this.appError.handleError(err))
      );
  } 

   updateTask(taskId: string,task: Task): Observable<Task  | AppError> {       
    return this.http.put<Task>(this.server.url+'/task/'+taskId+'/update', task, httpOptions)
     .pipe(             
       
        catchError(err => this.appError.handleError(err))        
      );
      
  } 

   deleteTask(taskId: string): Observable<Task | AppError> {      
    return this.http.delete<any>(this.server.url+'/task/'+taskId+'/delete')
     .pipe(             
        
        catchError(err => this.appError.handleError(err))        
      );
      
  }      
  
}