import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {addTask, loadTasks, loadTasksFailed, loadTasksSuccess, modifyTask, removeTask} from "./app.actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {selectTasks} from "./app.selectors";
import {GlobalState} from "../app.module";

const dummyTasks = [
  {
    "id": 1,
    "title": "Write a report",
    "description": "Prepare a report from the client meeting.",
    "createdAt": "2023-07-09T15:30:00Z",
    "status": "DONE"
  },
  {
    "id": 2,
    "title": "Clean the apartment",
    "description": "Vacuum, mop the floors, and tidy up the bathroom.",
    "createdAt": "2023-07-11T09:00:00Z",
    "status": "ACTIVE"
  },
  {
    "id": 3,
    "title": "Create a presentation",
    "description": "Prepare a presentation for the team meeting.",
    "createdAt": "2023-07-12T14:00:00Z",
    "status": "ACTIVE"
  },
  {
    "id": 4,
    "title": "Read a book",
    "description": "Finish reading an interesting book.",
    "createdAt": "2023-07-13T16:45:00Z",
    "status": "ACTIVE"
  },
  {
    "id": 5,
    "title": "Exercise",
    "description": "Do a series of exercises at the gym.",
    "createdAt": "2023-07-14T11:30:00Z",
    "status": "ACTIVE"
  },
  {
    "id": 6,
    "title": "Plan the vacation",
    "description": "Prepare a plan for the upcoming vacation.",
    "createdAt": "2023-07-15T12:00:00Z",
    "status": "ACTIVE"
  },
  {
    "id": 7,
    "title": "Visit friends",
    "description": "Go and visit friends over the weekend.",
    "createdAt": "2023-07-16T09:30:00Z",
    "status": "DONE"
  },
  {
    "id": 8,
    "title": "Grocery shopping",
    "description": "Buy milk, bread, eggs, and fruits.",
    "createdAt": "2023-07-10T10:00:00Z",
    "status": "ACTIVE"
  },
]

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
        let tasks = localStorage.getItem('tasks');
        if (!tasks) {
          localStorage.setItem('tasks', JSON.stringify(dummyTasks));
          tasks = localStorage.getItem('tasks');
        }
        return loadTasksSuccess({tasks: tasks ? JSON.parse(tasks) : dummyTasks});
      }),
      catchError(() => of(loadTasksFailed()))
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
