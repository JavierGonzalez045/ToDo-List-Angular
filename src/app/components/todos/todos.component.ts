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
    } else {
      this.todos.push({
        content: this.inputTodo,
        completed: false,
        canceled: false,
      });
    }
  }

  disablecancel(index: number) {
    alert('The task was canceled');
    this.todos[index].disable = true;
  }

  disablecomplete(index: number) {
    alert('The task was completed successfully');
    this.todos[index].disable = true;
  }
}
