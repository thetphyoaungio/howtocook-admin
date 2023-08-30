import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DatePipe, CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxPaginationModule } from "ngx-pagination";
import { SelectDropDownModule } from "ngx-select-dropdown";

import { SharedModule } from "src/app/shared/shared.module";

import { AllCategoriesComponent } from "./all-categories.component";
import { CategoriesHomeComponent } from "./home/home.component";
import { CategoriesCreateComponent } from "./create/create.component";
import { CategoriesEditComponent } from "./edit/edit.component";

import RouteNames from "src/app/core/helpers/route-names.helper";

const routes:Routes = [
    {
        path:'',
        component:AllCategoriesComponent,
        children:[
            {
                path:RouteNames.ALL_CATE_HOME,
                component:CategoriesHomeComponent
            },
            {
                path:RouteNames.ALL_CATE_CREATE,
                component:CategoriesCreateComponent
            },
            {
                path:`${RouteNames.ALL_CATE_EDIT}/:id`,
                component:CategoriesEditComponent
            },
            {
                path:'',
                redirectTo:RouteNames.ALL_CATE_HOME,
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
        AllCategoriesComponent,
        CategoriesHomeComponent,
        CategoriesCreateComponent,
        CategoriesEditComponent,
    ],
    exports:[RouterModule],
    providers:[DatePipe],
})
export class AllCategoriesRoutingModule {}