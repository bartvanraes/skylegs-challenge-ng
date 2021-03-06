import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// There is only one page so automatically redirect to it
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'flights'
  },
  {
    path: 'flights',
    loadChildren: 'src/app/flight/flight.module#FlightModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
