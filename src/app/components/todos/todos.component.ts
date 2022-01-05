import { style } from '@angular/animations';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ControlContainer } from '@angular/forms';
import { Todo } from './../../models/Todo';
import { empty } from 'rxjs';
import { invalid } from '@angular/compiler/src/render3/view/util';



@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  
  profileForm = new FormGroup({
    taskName: new FormControl('',[Validators.required]),
    dueDate: new FormControl(this.formatDate(new Date()),[Validators.required]),
  });

  todo: Array<any> = [];

  constructor(private fb: FormBuilder) {}
  onSum() {
     console.warn(this.profileForm.value.taskName);
     console.warn(this.profileForm.value.dueDate);
    if (this.formatDate(new Date()) <= this.profileForm.value.dueDate) {
      if (this.todo.length === 0) {
        this.todo = [this.profileForm.value];
      } 
      else 
      {
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
  get taskName(){return this.profileForm.get('taskName')}
  get dueDate(){return this.profileForm.get('dueDate')}
}


/*
  addTodo() {
    if (this.inputTodo == '' ) {
      alert("Can't leave the field empty");
    } else if (this.inputTodo.startsWith(' ')) {
      alert("Can't use WhiteSpace");
    }else if (
      this.todos.filter((data) => data.content === this.inputTodo).length > 0
    ) {
      alert('Cannot insert the same task name!');
    } else {
      this.todos.push({
        content: this.inputTodo,
        completed: false,
        canceled: false,
        duedate: this.inputDate,
      });
    }
  }
  */
 /*
  disablecancel(index: number) {
    this.todos.splice(index, 1, {
      content: this.todos[index].content,
      duedate: this.todos[index].duedate,
      completed: true ,
      canceled: true,
    });
  }

  disablecomplete(index: number) {
    this.todos.splice(index, 1, {
      content: this.todos[index].content,
      duedate: this.todos[index].duedate,
      completed: true,
      canceled: false,
    });
  }
}
*/  
