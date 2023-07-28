import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {GlobalState} from "../../app.module";
import {firstValueFrom} from "rxjs";
import {selectTaskById, selectTasks} from "../../store/app.selectors";
import {addTask, modifyTask} from "../../store/app.actions";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  readonly taskId = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _store: Store<GlobalState>,
    private router: Router,
  ) {
  }

  async ngOnInit() {
    if (this.taskId) {
      const tasks = this._store.select(selectTasks())
      const task = await firstValueFrom(this._store.select(selectTaskById(this.taskId)))
      if (task) {
        this.form.patchValue(task);
      }

    }
  }


  form: FormGroup = this.fb.group({
    title: [''],
    description: [''],
    createdAt: [''],
  });


  submit() {
    if (this.taskId) {
      this._store.dispatch(modifyTask({
        task: {
          ...this.form.value,
          id: this.taskId,
        }
      }));
    } else {
      this._store.dispatch(addTask({
        task: {
          ...this.form.value,
          id: this.randomId(),
        }
      }));
    }
    this.router.navigateByUrl('/todo/all');
  }

  randomId() {
    return Math.floor(Math.random() * 10000000);
  }


}
