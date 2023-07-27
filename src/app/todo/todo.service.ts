import {Injectable} from '@angular/core';
import {selectTasks} from "../store/app.selectors";
import {GlobalState} from "../app.module";
import {Store} from "@ngrx/store";
import {TaskStatus} from "../store/app.state";

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  constructor(
    private store: Store<GlobalState>,
  ) {
  }

  getTasks$(state?: TaskStatus) {
    return  this.store.select(selectTasks(state))
  }
}
