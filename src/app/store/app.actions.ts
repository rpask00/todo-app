import {createAction, props} from '@ngrx/store';
import {Task} from "./app.state";

export const loadTasks = createAction('[Root Component] load tasks');
export const loadTasksSuccess = createAction('[Root Component] load tasks success', props<{ tasks: Task[] }>());
export const loadTasksFailed = createAction('[Root Component] load tasks success');

export const addTask = createAction('[Root Component] Add task', props<{ task: Task }>());
export const addTaskSuccess = createAction('[Root Component] Add task success');
export const removeTask = createAction('[Root Component] Remove task', props<{ id: number }>());
export const removeTaskSuccess = createAction('[Root Component] Remove task success');
export const modifyTask = createAction('[Root Component] Modify task', props<{ task: Task }>());
export const modifyTaskSuccess = createAction('[Root Component] Modify task success');

export const emptyAction = createAction('[App] Empty Action');
