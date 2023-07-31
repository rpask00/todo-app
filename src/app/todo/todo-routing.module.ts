import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksListComponent} from "./components/tasks-list/tasks-list.component";
import {TaskFormComponent} from "./components/task-form/task-form.component";
import {TodoComponent} from "./todo.component";

const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
    children: [
      {
        path: 'new',
        component: TaskFormComponent
      },
      {
        path: 'edit/:id',
        component: TaskFormComponent
      },
      {
        path: 'all',
        component: TasksListComponent
      },
      {
        path: ':state',
        component: TasksListComponent
      },
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '*',
    redirectTo: '/all',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {
}
