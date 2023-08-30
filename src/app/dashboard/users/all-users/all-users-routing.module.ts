import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from "../../../shared/shared.module";

import RouteNames from "../../../core/helpers/route-names.helper";

import { AllUsersComponent } from "./all-users.component";
import { AllUsersHomeComponent } from "./home/home.component";
import { AllUsersUserDetailComponent } from "./user-detail/user-detail.component";
import { AllUsersPostDetailComponent } from "./post-detail/post-detail.component";

const routes: Routes = [
    {
        path:'',
        component: AllUsersComponent,
        children:[
            {
                path:RouteNames.ALL_USERS_HOME,
                component:AllUsersHomeComponent,
            },
            {
                path:`${RouteNames.ALL_USERS_USER_DETAIL}/:id/:invoker`,
                component:AllUsersUserDetailComponent,
            },
            {
                path:`${RouteNames.ALL_USERS_POST_DETAIL}/:id/:invoker`,
                component:AllUsersPostDetailComponent,
            },
            {
                path:'',
                redirectTo:RouteNames.ALL_USERS_HOME,
                pathMatch:'full',
            }
        ]
    }
]

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        SharedModule, 
        SelectDropDownModule,
        NgxPaginationModule, 
    ],
    declarations:[
        AllUsersComponent, 
        AllUsersHomeComponent,
        AllUsersUserDetailComponent,
        AllUsersPostDetailComponent,
    ],
    exports:[RouterModule],
    providers:[DatePipe],
})
export class AllUsersRoutingModule {}