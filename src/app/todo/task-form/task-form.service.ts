import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {GlobalState} from "../../app.module";
import {addTask, modifyTask} from "../../store/app.actions";
import {Task} from "../../store/app.state";
import {Observable} from "rxjs";
import {selectTaskById} from "../../store/app.selectors";

@Injectable()
export class TaskFormService {
  constructor(
    private _store: Store<GlobalState>,
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
