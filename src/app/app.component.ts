import {Component, OnInit} from '@angular/core';
import {GlobalState} from "./app.module";
import {Store} from "@ngrx/store";
import {loadTasks} from "./store/app.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private _store: Store<GlobalState>,
  ) {
  }

  ngOnInit() {
    this._store.dispatch(loadTasks())
  }


}
