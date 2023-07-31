import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.module";
import {addTask, modifyTask} from "../../store/todo.actions";
import {Task} from "../../store/todo.state";
import {Observable} from "rxjs";
import {selectTaskById} from "../../store/todo.selectors";

@Injectable()
export class TaskFormService {
  constructor(
    private _store: Store<AppState>,
  ) {
  }

  public getTaskById$(id: number): Observable<Task | undefined> {
    return this._store.select(selectTaskById(id))
  }


  public addNewTask(task: Task) {
    this._store.dispatch(addTask({task}));
  }

  public modifyTask(task: Task) {
    this._store.dispatch(modifyTask({task}));
  }
}
