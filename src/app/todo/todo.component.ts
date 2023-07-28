import {Component} from '@angular/core';
import {TodoService} from "./todo.service";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs";
import {Task} from "../store/app.state";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  constructor(
    private _todoService: TodoService,
    private _route: ActivatedRoute,
  ) {

  }

  readonly tasks$ = this._route.params.pipe(
    map(params => params['state']),
    switchMap(state => this._todoService.getTasks$(state)),
    map(tasks => tasks.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ))
  )

  changeTaskStatus(task: Task) {
    this._todoService.changeTaskStatus(task);
  }

  editTask(task: Task) {
    this._todoService.editTask(task);
  }

  deleteTask(task: Task) {
    this._todoService.deleteTask(task);

  }
}
