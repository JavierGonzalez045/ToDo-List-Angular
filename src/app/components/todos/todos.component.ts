import { style } from '@angular/animations';
import { Content, NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ControlContainer,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Status } from 'src/app/models/Status';
import { empty } from 'rxjs';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { TodolistService } from '../../services/todolist.service';
import Swal from 'sweetalert2';
import { Taskstatus } from '../../models/Status';
import { catchError } from 'rxjs/operators';
import { isNull } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  profileForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      this.noWhitespace,
      Validators.maxLength(20),
    ]),
    dueDate: new FormControl(this.formatDate(new Date()), [
      Validators.required,
    ]),
    status: new FormControl(Status.pending),
  });


  todo: Array<any> = [];

  constructor(private fb: FormBuilder, private apiservice: TodolistService) {
    this.getData();
  }

  getData() {


    this.apiservice
      .getTodolist()
      .subscribe((result: any) => {
        this.todo = result
      },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Connection Error',
          })
        });
  }

  onSum() {
    let { status, dueDate, title, id } = this.profileForm.value;
    const task: Task = {
      status,
      dueDate,
      title,
      id,
    };

    if (this.TodoValidations(task))

      this.apiservice.postTodo(task).subscribe((response) => {
        console.log('TAREA->', response.id);
        this.AddDataTodo(task);
        task.id = response.id;
      }, (error) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Connection Error',
      })
      );
  }
  private formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  //-------------------------------------------------------------AddData()----------------------------------------------------------------------------
  AddDataTodo(task: Task) {

    this.todo = [...this.todo, task];

  }

  //---------------------------------------------------------------Validators---------------------------------------------------------------------
  get title() {
    return this.profileForm.get('title');
  }
  get dueDate() {
    return this.profileForm.get('dueDate');
  }
  get status() {
    return this.profileForm.get('status');
  }

  public noWhitespace(control: FormControl) {
    let isWhitespace = (control.value || ' ').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  public TodoValidations(task: Task) {
    if (this.todo.filter(
      (data) => data.title === task.title).length > 0) {
      return alert('Cannot insert the same task name!');
    }
    else if (this.todo.filter(
      (data) => data.title.toLowerCase() === task.title.toLowerCase()).length > 0) {
      return alert('Cannot insert the same task name!');
    }
    else if (this.formatDate(new Date()) > task.dueDate) {
      return alert('cant insert past dates');
    }
    else {
      return this.todo;
    }
  }
  //---------------------------------------------------------------Buttons-----------------------------------------------------------------------------------------

  UpdateStatus(arr: Task, index: number, state: Status) {
    this.apiservice.patchTodo(arr, state).subscribe((data) => {
      console.log(data);
      this.todo.splice(index, 1, {
        title: arr.title,
        dueDate: arr.dueDate,
        status: state,
        id: arr.id,
      });
    },
      (error) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Connection Error',
      })
    );
  }

  statusToText(value: number) {
    switch (value) {
      case 0:
        return 'Pending';
      case 1:
        return 'Canceled';
      case 2:
        return 'Completed';
    }
    return 'ninguno';
  }
}