import {Injectable} from '@angular/core';
import {selectTasks} from "../store/app.selectors";
import {GlobalState} from "../app.module";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Task} from "../store/app.state";

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  readonly tasks$: Observable<Task[]> = this.store.select(selectTasks());

  constructor(
    private store: Store<GlobalState>,
  ) {
  }
}
