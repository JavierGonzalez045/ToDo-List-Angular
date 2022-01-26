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
    /*
    El update del status en la base de datos funciona correctamente,
    ahora se debe de aplicar correctamente, nosotros hicimos una prueba
    ingresando el valor manualmente.
    */
    // task.id = '29E0EE53-BE1E-4BA9-BFAE-08D9E0F24CBD';
    // task.status = 2;
    // debugger;
    return this.http.patch<Task>(`${this.url}/${task.id}`, {
      status: task.status,
    });
  }
}
