import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {todoReducer} from "./store/todo.reducer";
import {EffectsModule} from "@ngrx/effects";
import {TodoEffects} from "./store/todo.effects";
import {TodoComponent} from './todo.component';
import {RouterOutlet} from "@angular/router";
import {TodoRoutingModule} from "./todo-routing.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TasksListComponent} from "./components/tasks-list/tasks-list.component";
import {TaskComponent} from "./components/task/task.component";
import {TaskFormComponent} from "./components/task-form/task-form.component";
import {FormComponent} from "./components/task-form/form/form.component";


@NgModule({
  declarations: [
    TodoComponent,
    TasksListComponent,
    TaskComponent,
    TaskFormComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('todo', todoReducer),
    EffectsModule.forFeature([TodoEffects]),
    RouterOutlet,
    TodoRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatExpansionModule
  ]
})
export class TodoModule {
}
