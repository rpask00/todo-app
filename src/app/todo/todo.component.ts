import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../app.module";
import {loadTasks} from "./store/todo.actions";

@Component({
  selector: 'app-todo',
  template: '<router-outlet></router-outlet>',
})
export class TodoComponent implements OnInit{
  constructor(
    private _store: Store<AppState>,
  ) {
  }

  ngOnInit() {
    this._store.dispatch(loadTasks())
  }
}
