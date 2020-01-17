import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'shows/latest', 
    pathMatch: 'full' 
  },
  {
    path: 'shows',
    loadChildren: () =>
      import('./shows/shows.module').then(m => m.ShowsModule)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
