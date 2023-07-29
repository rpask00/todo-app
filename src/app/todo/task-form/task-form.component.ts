import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {firstValueFrom} from "rxjs";
import {TaskStatus} from "../../store/app.state";
import {TaskFormService} from "./task-form.service";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  providers: [TaskFormService]
})
export class TaskFormComponent implements OnInit {
  readonly taskId = parseInt(this._route.snapshot.paramMap.get('id') || '0', 10);

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _taskFormServiceService: TaskFormService,
    private _router: Router,
  ) {
  }

  async ngOnInit() {
    if (this.taskId) {
      this.loadTask();
    }
  }

  readonly form: FormGroup = this._fb.group({
    title: ['', Validators.required],
    description: [''],
    dueDate: [''],
  });

  async loadTask() {
    if (!this.taskId) {
      return
    }

    const task = await firstValueFrom(this._taskFormServiceService.getTaskById(this.taskId));

    if (task) {
      this.form.patchValue(task);
    }
  }


  submit() {
    if (this.taskId) {
      this._taskFormServiceService.addNewTask({
          ...this.form.value,
          id: this.taskId,
        }
      );
    } else {
      this._taskFormServiceService.modifyTask({
          ...this.form.value,
          id: this.randomId(),
          createdAt: new Date(),
          status: TaskStatus.ACTIVE
        }
      );
    }

    this._router.navigateByUrl('/todo/all');
  }

  randomId() {
    return Math.floor(Math.random() * 10000000);
  }
}
