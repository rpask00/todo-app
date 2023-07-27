import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {addTask, loadTasks, loadTasksFailed, loadTasksSuccess, modifyTask, removeTask} from "./app.actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {selectTasks} from "./app.selectors";
import {GlobalState} from "../app.module";

@Injectable({
  providedIn: 'root'
})
export class AppEffects {

  constructor(
    private _actions$: Actions,
    private _store: Store<GlobalState>,
  ) {
  }

  onLoadTasks$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadTasks),
      map(() => {
        const tasks = localStorage.getItem('tasks');
        return loadTasksSuccess({tasks: tasks ? JSON.parse(tasks) : []});
      }),
      catchError(()=> of(loadTasksFailed()))
    ))


  onAddTask$ = createEffect(() => {
      return this._actions$.pipe(
        ofType(addTask, modifyTask, removeTask),
        switchMap(() => this._store.select(selectTasks())),
        tap((tasks) => localStorage.setItem('tasks', JSON.stringify(tasks)))
      );
    }, {
      dispatch: false
    }
  )
}
