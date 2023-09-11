import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxPaginationModule } from "ngx-pagination";

import { SharedModule } from "../../shared/shared.module";

import RouteNames from "src/app/core/helpers/route-names.helper";

import { FeedBackComponent } from "./feedback.component";
import { FeedBackListComponent } from "./list/list.componnet";

const routes:Routes = [
    {
        path:'',
        component:FeedBackComponent,
        children:[
            {
                path:RouteNames.CUSTOM_FEEDBACK_LIST,
                component: FeedBackListComponent
            },
            {
                path:'',
                redirectTo:RouteNames.CUSTOM_FEEDBACK_LIST,
                pathMatch:'full',
            }
        ],
    },
];

@NgModule({
    imports:[
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule, 
        ReactiveFormsModule,
        SharedModule,
        NgxPaginationModule,
    ],
    exports:[RouterModule],
    declarations:[
        FeedBackComponent,
        FeedBackListComponent,
    ],
    providers:[DatePipe],
})
export class FeedBackRoutingModule {}