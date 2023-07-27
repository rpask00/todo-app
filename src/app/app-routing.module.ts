import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoComponent} from "./todo/todo.component";
import {TaskFormComponent} from "./todo/task-form/task-form.component";

const routes: Routes = [
  {
    path: 'todo',
    children: [
      {
        path: 'all',
        component: TodoComponent
      },
      {
        path: ':state',
        component: TodoComponent
      },
      {
        path: 'new',
        component: TaskFormComponent
      },
      {
        path: 'edit/:id',
        component: TaskFormComponent
      },
      {
        path: '*/',
        redirectTo: 'all',
      }
    ]
  },
  {
    path: '*/',
    redirectTo: 'todo',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
