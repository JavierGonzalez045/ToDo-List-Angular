import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
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
    return this.http.get(this.url, { headers: header }).pipe(catchError(this.errorHandler))
  }

  postTodo(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task).pipe(catchError(this.errorHandler));
  }

  patchTodo(task: Task, state: Status): Observable<Task> {
    return this.http.patch<Task>(`${this.url}/${task.id}`, { status: state });
  }
  errorHandler(error: HttpErrorResponse){
    return throwError(() => error);
  }
}


// { status: task.status }
// task.status
