import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoComponent} from "./todo/todo.component";

const routes: Routes = [
  {
    path: 'todo',
    children: [
      {
        path: 'all',
        component: TodoComponent
      },
      {
        path: 'done',
        component: TodoComponent
      },
      {
        path: 'active',
        component: TodoComponent
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
