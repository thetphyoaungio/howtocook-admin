import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from "src/app/shared/shared.module";

import { TipsComponent } from "./tips.component";
import { TipsHomeComponent } from "./home/home.component";
import { TipCreateComponent } from "./create/create.component";
import { TipEditComponent } from "./edit/edit.component";
import { TipDetailComponent } from "./detail/detail.component";

import RouteNames from "src/app/core/helpers/route-names.helper";

const routes:Routes = [
    {
        path:'',
        component:TipsComponent,
        children:[
            {
                path:RouteNames.TIPS_HOME,
                component:TipsHomeComponent
            },
            {
                path:RouteNames.TIPS_CREATE,
                component:TipCreateComponent
            },
            {
                path:`${RouteNames.TIPS_EDIT}/:id`,
                component:TipEditComponent
            },
            {
                path:`${RouteNames.TIPS_DETAIL}/:id`,
                component:TipDetailComponent
            },
            {
                path:'',
                redirectTo:RouteNames.TIPS_HOME,
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
        TipsComponent,
        TipsHomeComponent,
        TipCreateComponent,
        TipEditComponent,
        TipDetailComponent,
    ],
    exports:[RouterModule],
    providers:[DatePipe],
})
export class TipsRoutingModule {}