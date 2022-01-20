import { style } from '@angular/animations';
import { Content } from '@angular/compiler/src/render3/r3_ast';
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
} from '@angular/forms';
import { Status } from 'src/app/models/Status';
import { empty } from 'rxjs';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { TodolistService } from '../../services/todolist.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  profileForm = new FormGroup({
    taskName: new FormControl('', [
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

  tasks: Task[] = [];

  constructor(private fb: FormBuilder, private apiservice: TodolistService) {
    this.getData();
  }

  getData() {
    this.apiservice
      .getTodolist()
      .subscribe((result: any) => console.log(result));
  }

  //   constructor(private fb: FormBuilder, private apiservice: TodolistService) {
  //     this.apiservice.getTodolist().subscribe((result: any) => {
  //       this.tasks = result;
  //     });
  // }

  onSum() {
    const { status, dueDate, taskName: title } = this.profileForm.value;
    const task: Task = {
      status,
      dueDate,
      title,
    };

    this.apiservice.postTodo(task).subscribe((response) => {
      console.log(response);
      this.getData();
    });

    this.apiservice.patchTodo(task).subscribe((data) => {
      console.log(data);
    });

    // this.apiservice.patchTodo(task).subscribe((update) => {
    //   console.log(update);
    //   this;
    // });

    /*  this.apiservice.patchTodo(task).subscribe((response) => {
      console.log(response);
    }); */

    if (this.formatDate(new Date()) <= this.profileForm.value.dueDate) {
      if (this.todo.length === 0) {
        this.todo = [this.profileForm.value];
      } else if (
        this.todo.filter(
          (data) => data.taskName === this.profileForm.value.taskName
        ).length > 0
      ) {
        alert('Cannot insert the same task name!');
      } else if (
        this.todo.filter(
          (data) =>
            data.taskName.toUpperCase() === this.profileForm.value.taskName
        ).length > 0
      ) {
        alert('Cannot insert the same task name!');
      } else {
        this.todo = [...this.todo, this.profileForm.value];
      }
    } else {
      alert("Can't enter past dates");
    }
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
  //---------------------------------------------------------------Validators---------------------------------------------------------------------
  get taskName() {
    return this.profileForm.get('taskName');
  }
  get dueDate() {
    return this.profileForm.get('dueDate');
  }
  get status() {
    return this.profileForm.get('status');
  }

  public noWhitespace(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  //---------------------------------------------------------------Buttons---------------------------------------------------------------------
  CanceledTask(arr: any, index: number) {
    console.log(arr, index);

    this.todo.splice(index, 1, {
      taskName: arr.taskName,
      dueDate: arr.dueDate,
      status: Status.canceled,
      completed: true,
      canceled: true,
    });
  }
  CompletedTask(arr: any, index: number) {
    this.todo.splice(index, 1, {
      taskName: arr.taskName,
      dueDate: arr.dueDate,
      status: Status.completed,
      completed: true,
      canceled: false,
    });
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
