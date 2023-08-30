import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from "src/app/shared/shared.module";

import { AdminListComponent } from "./list.component";
import { AdminListHomeComponent } from "./home/home.component";
import { AdminListCreateComponent } from "./create/create.component";
import { AdminListEditComponent } from "./edit/edit.component";
import { AdminListDetailComponent } from "./detail/detail.component";

import RouteNames from "src/app/core/helpers/route-names.helper";

const routes:Routes = [
    {
        path:'',
        component:AdminListComponent,
        children:[
            {
                path:RouteNames.ADMIN_LIST_HOME,
                component:AdminListHomeComponent
            },
            {
                path:RouteNames.ADMIN_CREATE,
                component:AdminListCreateComponent
            },
            {
                path:`${RouteNames.ADMIN_EDIT}/:id/:returnTarget`,
                component:AdminListEditComponent
            },
            {
                path:`${RouteNames.ADMIN_DETAIL}/:id`,
                component:AdminListDetailComponent
            },
            {
                path:'',
                redirectTo:RouteNames.ADMIN_LIST_HOME,
                pathMatch:'full',
            },
        ],
    }
];

@NgModule({
    imports:[
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule, 
        ReactiveFormsModule,
        NgxPaginationModule,
        SharedModule,
    ],
    declarations:[
        AdminListComponent,
        AdminListHomeComponent,
        AdminListCreateComponent,
        AdminListEditComponent,
        AdminListDetailComponent,
    ],
    exports:[RouterModule],
    providers:[DatePipe],
})
export class AdminListRoutingModule {}