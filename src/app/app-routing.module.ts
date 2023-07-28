import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksListComponent} from "./todo/tasks-list.component";
import {TaskFormComponent} from "./todo/task-form/task-form.component";

const routes: Routes = [
  {
    path: 'todo',
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
    path: '',
    redirectTo: 'todo',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
