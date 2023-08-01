import {createSelector} from "@ngrx/store";
import {TodoState, TaskStatus, Task} from "./todo.state";
import {AppState} from "../../app.module";

export const selectTodoState = (state: AppState) => state.todo;


export const selectTasks = (status?: TaskStatus) => createSelector(
  selectTodoState,
  (state: TodoState) => state.tasks?.filter((task) => !status || task.status === status)
)

export const selectTaskById = (id: number) => createSelector(
  selectTasks(),
  (tasks: Task[]) => tasks.find((task) => task.id === id)
)
