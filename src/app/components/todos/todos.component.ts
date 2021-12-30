import { style } from '@angular/animations';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { Todo } from './../../models/Todo';
import { empty } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos = new Array<Todo>();

  inputTodo: string = '';

  inputDate?: Date;

  constructor() {}

  ngOnInit(): void {}

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
  blockSpecialChar(e: { keyCode: any; }) {
    var k = e.keyCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8   || (k >= 48 && k))
    }
  disablecancel(index: number) {
    this.todos.splice(index, 1, {
      content: this.todos[index].content,
      duedate: this.todos[index].duedate,
      completed: true,
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