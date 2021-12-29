import { style } from '@angular/animations';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { Todo } from './../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos = new Array<Todo>();

  inputTodo: string = '';

  constructor() {}

  ngOnInit(): void {}

  addTodo() {
    if (this.inputTodo == '') {
      alert("Can't leave the field empty");
    } else if (this.inputTodo.startsWith(' ')) {
      alert("Can't use WhiteSpace");
    } else if (this.inputTodo.length >= 20) {
      alert('The character length cannot be greater than 20');
    } else {
      this.todos.push({
        content: this.inputTodo,
        completed: false,
        canceled: false,
      });
    }
  }

  disablecancel(index: number) {
    this.todos.splice(index, 1, {
      content: this.inputTodo,
      completed: true,
      canceled: true,
    });
  }

  disablecomplete(index: number) {
    this.todos.splice(index, 1, {
      content: this.inputTodo,
      completed: true,
      canceled: false,
    });
  }
}
