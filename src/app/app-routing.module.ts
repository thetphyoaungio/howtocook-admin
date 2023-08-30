import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import RouteNames from './core/helpers/route-names.helper';

const routes: Routes = [
  {
    path:RouteNames.AUTH,
    loadChildren:()=>import('./auth/auth.module')
    .then(m => m.AuthModule),
  },
  {
    path:RouteNames.DASHBOARD,
    loadChildren:() => import('./dashboard/dashboard.module')
    .then(m => m.DashboardModule),
  },
  {
    path:'',
    redirectTo:RouteNames.AUTH,
    pathMatch:'full',
  }
];

const config:ExtraOptions = {
  useHash: false
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, config),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
