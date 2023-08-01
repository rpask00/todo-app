import {Component, OnInit} from '@angular/core';
import {TasksListService} from "./tasks-list.service";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs";
import {Task} from "../../store/todo.state";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  providers: [TasksListService]
})
export class TasksListComponent {
  constructor(
    private _tasksListService: TasksListService,
    private _route: ActivatedRoute,
  ) {
  }

  readonly state$ = this._route.params.pipe(
    map(params => params['state'] || '')
  )

  readonly tasks$ = this.state$.pipe(
    switchMap(state => this._tasksListService.getTasks$(state)),
    map(tasks => tasks.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ))
  )

  changeTaskStatus(task: Task) {
    this._tasksListService.changeTaskStatus(task);
  }

  editTask(task: Task) {
    this._tasksListService.editTask(task);
  }

  removeTask(task: Task) {
    this._tasksListService.removeTask(task);
  }
}
