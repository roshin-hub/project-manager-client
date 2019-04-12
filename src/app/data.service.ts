import { Injectable, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ServerConfig } from '../environments/environment';
import { AppError } from './models/app.error';
import { Product } from './models/product';
import { User } from './models/user';

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

 

  getProjects() {
    return this.http.get('http://localhost:8080/project');
  }

  /*createProject(data) {
    headers= " { 'Content-Type': 'application/x-www-form-urlencoded' }"
    return this.http.post('http://localhost:8080/project/create', data,headers) 

  }*/

  createProject(product: Product): Observable<Product | AppError> {
    console.log(product)
    console.log(this.server.url)
    
    return this.http.post<Product>(this.server.url+'/project/create', product, httpOptions)
     .pipe(             
        //catchError(err => this.appError.handleError(err))
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
  
}