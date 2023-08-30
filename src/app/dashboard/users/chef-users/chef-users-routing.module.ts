import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { SharedModule } from "../../../shared/shared.module";
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';

import RouteNames from "../../../core/helpers/route-names.helper";

import { ChefUsersComponent } from "./chef-users.component";
import { ChefUsersHomeComponent } from "./home/home.component";
import { ChefUsersUserDetailComponent } from "./user-detail/user-detail.component";
import { ChefUsersPostDetailComponent } from "./post-detail/post-detail.component";

const routes: Routes = [
    {
        path:'',
        component: ChefUsersComponent,
        children:[
            {
                path:RouteNames.CHEF_USERS_HOME,
                component:ChefUsersHomeComponent,
            },
            {
                path:`${RouteNames.CHEF_USERS_USER_DETAIL}/:id`,
                component:ChefUsersUserDetailComponent,
            },
            {
                path:`${RouteNames.CHEF_USERS_POST_DETAIL}/:id`,
                component:ChefUsersPostDetailComponent,
            },
            {
                path:'',
                redirectTo:RouteNames.CHEF_USERS_HOME,
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
        ChefUsersComponent, 
        ChefUsersHomeComponent,
        ChefUsersUserDetailComponent,
        ChefUsersPostDetailComponent,
    ],
    exports:[RouterModule],
    providers:[DatePipe],
})
export class ChefUsersRoutingModule {}