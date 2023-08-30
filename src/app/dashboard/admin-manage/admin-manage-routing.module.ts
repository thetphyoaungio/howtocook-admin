import { NgModule } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";
import { AdminManageComponent } from "./admin-manage.component";

import RouteNames from "src/app/core/helpers/route-names.helper";

const routes:Routes = [
    {
        path:'',
        component:AdminManageComponent,
        children:[
            {
                path:RouteNames.ADMIN_LIST,
                loadChildren:() => import('./list/list.module')
                .then(m => m.AdminListModule)
            },
            {
                path:'',
                redirectTo:RouteNames.ADMIN_LIST,
                pathMatch:'full'
            }
        ],
    },
];

@NgModule({
    imports:[
        RouterModule.forChild(routes),
    ],
    declarations:[AdminManageComponent],
    exports:[RouterModule]
})
export class AdminManageRoutingModule {}