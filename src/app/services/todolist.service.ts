import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task';
import { StatusCompleted, Status } from '../models/Status';

@Injectable({
  providedIn: 'root',
})
export class TodolistService {
  httpOptions = {
    headers: new HttpHeaders({ 'Type-content': 'application/json' }),
  };

  url: string = `${environment.apiURL}/Tasks`;
  constructor(private http: HttpClient) {}
  getTodolist() {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.get(this.url, { headers: header });
  }
  postTodo(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task);
  }

  patchTodo(task: Task): Observable<Task> {
    return this.http.patch<Task>(this.url, { status: task.status });
  }
}

// { status: task.status }
// task.status
