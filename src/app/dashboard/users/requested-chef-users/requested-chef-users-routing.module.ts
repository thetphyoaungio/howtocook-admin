import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { SharedModule } from "../../../shared/shared.module";
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';

import RouteNames from "../../../core/helpers/route-names.helper";

import { RequestChefUsersComponent } from "./requested-chef-users.component";
import { RequestChefUsersHomeComponent } from "./home/home.component";
import { RequestChefUsersUserDetailComponent } from "./user-detail/user-detail.component";

const routes: Routes = [
    {
        path:'',
        component: RequestChefUsersComponent,
        children:[
            {
                path:RouteNames.REQUEST_CHEF_USERS_HOME,
                component:RequestChefUsersHomeComponent,
            },{
                path:`${RouteNames.REQUEST_CHEF_USERS_USER_DETAIL}/:id`,
                component:RequestChefUsersUserDetailComponent,
            },
            {
                path:'',
                redirectTo:RouteNames.REQUEST_CHEF_USERS_HOME,
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
        RequestChefUsersComponent, 
        RequestChefUsersHomeComponent,
        RequestChefUsersUserDetailComponent,
    ],
    exports:[RouterModule],
    providers:[DatePipe],
})
export class RequestChefUsersRoutingModule {}