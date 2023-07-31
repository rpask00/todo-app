import {createReducer, on} from '@ngrx/store';
import {initialState, Task} from "./todo.state";
import {addTask, loadTasksSuccess, modifyTask, removeTask} from "./todo.actions";


export const todoReducer = createReducer(
  initialState,
  on(loadTasksSuccess, (state, {tasks}) => ({...state, tasks})),
  on(addTask, (state, {task}) => ({...state, tasks: [...state.tasks, task]})),
  on(removeTask, (state, {id}) => ({...state, tasks: [...state.tasks.filter((task: Task) => task.id !== id)]})),
  on(modifyTask, (state, {task}) => ({
    ...state,
    tasks: [...state.tasks.map((t: Task) => t.id === task.id ? {...t, ...task} : t)]
  })),
);
