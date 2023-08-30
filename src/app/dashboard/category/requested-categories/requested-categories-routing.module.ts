import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DatePipe, CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxPaginationModule } from "ngx-pagination";
import { SelectDropDownModule } from "ngx-select-dropdown";

import { SharedModule } from "src/app/shared/shared.module";

import { RequestedCategoriesComponent } from "./requested-categories.component";
import { RequestedCategoriesHomeComponent } from "./home/home.component";

import RouteNames from "src/app/core/helpers/route-names.helper";

const routes:Routes = [
    {
        path:'',
        component:RequestedCategoriesComponent,
        children:[
            {
                path:RouteNames.REQUESTED_CATE_HOME,
                component:RequestedCategoriesHomeComponent
            },
            {
                path:'',
                redirectTo:RouteNames.REQUESTED_CATE_HOME,
                pathMatch:'full',
            },
        ],
    },
];

@NgModule({
    imports:[
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        SelectDropDownModule,
        SharedModule,
    ],
    declarations:[
        RequestedCategoriesComponent,
        RequestedCategoriesHomeComponent,
    ],
    exports:[RouterModule],
    providers:[DatePipe],
})
export class RequestedCategoriesRoutingModule {}