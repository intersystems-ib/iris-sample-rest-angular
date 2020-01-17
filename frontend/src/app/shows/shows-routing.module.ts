import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowLatestComponent } from './show-latest/show-latest.component';

const routes: Routes = [
  {
    path: '',
    component: ShowLatestComponent,
    children: [
      {
        path: '',
        redirectTo: 'latest/',
        pathMatch: 'full'
      },
      {
        path: 'latest',
        component: ShowLatestComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowsRoutingModule { }
