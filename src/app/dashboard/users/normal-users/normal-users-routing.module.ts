import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { SharedModule } from "../../../shared/shared.module";
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';

import RouteNames from "../../../core/helpers/route-names.helper";

import { NormalUsersComponent } from "./normal-users.component";
import { NormalUsersHomeComponent } from "./home/home.component";
import { NormalUsersUserDetailComponent } from "./user-detail/user-detail.component";

const routes: Routes = [
    {
        path:'',
        component: NormalUsersComponent,
        children:[
            {
                path:RouteNames.NORMAL_USERS_HOME,
                component:NormalUsersHomeComponent,
            },{
                path:`${RouteNames.NORMAL_USERS_USER_DETAIL}/:id`,
                component:NormalUsersUserDetailComponent,
            },
            {
                path:'',
                redirectTo:RouteNames.NORMAL_USERS_HOME,
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
        NormalUsersComponent, 
        NormalUsersHomeComponent,
        NormalUsersUserDetailComponent,
    ],
    exports:[RouterModule],
    providers:[DatePipe],
})
export class NormalUsersRoutingModule {}