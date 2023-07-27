import {Component} from '@angular/core';
import {TodoService} from "./todo.service";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs";

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
    switchMap(state => this._todoService.getTasks$(state))
  )
}
