import {Injectable} from "@angular/core";
import {Actions} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "./app.state";

@Injectable({
  providedIn: 'root'
})
export class AppEffects {

  constructor(
    private _actions$: Actions,
    private _store: Store<AppState>,
  ) {
  }

}
