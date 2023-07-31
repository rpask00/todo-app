import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Task} from "../../store/app.state";
import {TaskFormService} from "./task-form.service";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  providers: [TaskFormService]
})
export class TaskFormComponent {
  readonly taskId = parseInt(this._route.snapshot.paramMap.get('id') || '0', 10);
  readonly task$ = this._taskFormServiceService.getTaskById$(this.taskId);

  constructor(
    private _route: ActivatedRoute,
    private _taskFormServiceService: TaskFormService,
    private _router: Router,
  ) {
  }


  submit(task: Task) {
    if (this.taskId) {
      this._taskFormServiceService.modifyTask({...task});
    } else {
      this._taskFormServiceService.addNewTask({...task});
    }

    this._router.navigateByUrl('/todo/all');
  }
}
