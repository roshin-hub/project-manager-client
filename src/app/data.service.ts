import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

   firstClick() {
    return console.log('clicked');
  }

  getUsers() {
    return this.http.get('https://reqres.in/api/users');
  }

  getProjects() {
    return this.http.get('http://localhost:8080/project');
  }
}
