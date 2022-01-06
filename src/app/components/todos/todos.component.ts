import { style } from '@angular/animations';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ControlContainer, ValidationErrors } from '@angular/forms';
import { Status } from 'src/app/models/Status';
import { empty } from 'rxjs';
import { invalid } from '@angular/compiler/src/render3/view/util';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {   
  profileForm = new FormGroup({
    taskName: new FormControl('',[Validators.required, this.noWhitespace,Validators.maxLength(20)]),
    dueDate: new FormControl(this.formatDate(new Date()),[Validators.required]),
    status: new FormControl(Status.pending),
  });
  todo: Array<any> = [];
  

  constructor(private fb: FormBuilder) {}
  onSum() {
  
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
  //---------------------------------------------------------------Validators---------------------------------------------------------------------
  get taskName(){return this.profileForm.get('taskName')}
  get dueDate(){return this.profileForm.get('dueDate')}
  get status(){return this.profileForm.get('status')}

  public noWhitespace(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
}
CanceledTask(){

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
*/ } 
