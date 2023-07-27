import {createAction, props} from '@ngrx/store';
import {Task} from "./app.state";

export const loadTasks = createAction('[Root Component] load tasks');
export const loadTasksSuccess = createAction('[Root Component] load tasks success', props<{ tasks: Task[] }>());
export const loadTasksFailed = createAction('[Root Component] load tasks success');

export const addTask = createAction('[Root Component] Add task', props<{ task: Task }>());
export const removeTask = createAction('[Root Component] Remove task', props<{ id: number }>());
export const modifyTask = createAction('[Root Component] Modify task', props<{ task: Task }>());
