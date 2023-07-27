import { createReducer, on } from '@ngrx/store';
import {initialState} from "./app.state";


export const appReducer = createReducer(
  initialState,
  // on(increment, (state) => state + 1),
);
