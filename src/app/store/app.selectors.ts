import {createSelector} from "@ngrx/store";
import {AppState, TaskStatus, Task} from "./app.state";
import {GlobalState} from "../app.module";

export const selectRootState = (state: GlobalState) => state.root;


export const selectTasks = (status?: TaskStatus) => createSelector(
  selectRootState,
  (state: AppState) => state.tasks?.filter((task) => !status || task.status === status)
)

export const selectTaskById = (id: number) => createSelector(
  selectTasks(),
  (tasks: Task[]) => tasks?.find((task) => task.id === id)
)
