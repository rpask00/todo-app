import { createReducer, on } from '@ngrx/store';
import {initialState, Task} from "./app.state";
import {addTask, loadTasksSuccess, modifyTask, removeTask} from "./app.actions";


export const appReducer = createReducer(
  initialState,
  on(loadTasksSuccess, (state, {tasks}) => ({...state, tasks})),
  on(addTask, (state, {task}) => ({...state, tasks: [...state.tasks, task]})),
  on(removeTask, (state, {id}) => ({...state, tasks: [...state.tasks.filter((task: Task) => task.id !== id)]})),
  on(modifyTask, (state, {task}) => ({...state, tasks: [...state.tasks.map((t: Task) => t.id === task.id ? task : t)]})),
);
