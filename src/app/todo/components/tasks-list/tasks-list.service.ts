import {Injectable} from '@angular/core';
import {AppState} from "../../../app.module";
import {Store} from "@ngrx/store";
import {Task, TaskStatus} from "../../store/todo.state";
import {Router} from "@angular/router";
import {selectTasks} from "../../store/todo.selectors";
import {modifyTask, removeTask} from "../../store/todo.actions";

@Injectable()
export class TasksListService {
  constructor(
    private store: Store<AppState>,
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

  removeTask(task: Task) {
    this.store.dispatch(removeTask({id: task.id}))
  }

}
