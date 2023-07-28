import {Injectable} from '@angular/core';
import {selectTasks} from "../store/app.selectors";
import {GlobalState} from "../app.module";
import {Store} from "@ngrx/store";
import {Task, TaskStatus} from "../store/app.state";
import {modifyTask, removeTask} from "../store/app.actions";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  constructor(
    private store: Store<GlobalState>,
    private _router: Router,
  ) {
  }

  getTasks$(state?: TaskStatus) {
    return this.store.select(selectTasks(state))
  }

  changeTaskStatus(task: Task) {
    this.store.dispatch(modifyTask({
      task: {
        ...task,
        status: task.status === TaskStatus.DONE ? TaskStatus.ACTIVE : TaskStatus.DONE
      }
    }))
  }


  editTask(task: Task) {
    this._router.navigate(['todo', 'edit', task.id])
  }

  deleteTask(task: Task) {
    this.store.dispatch(removeTask({id: task.id}))
  }

}
