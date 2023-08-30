import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { SharedModule } from "../../../shared/shared.module";
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';

import RouteNames from "../../../core/helpers/route-names.helper";

import { BlockListUsersComponent } from "./block-list-users.component";
import { BlockListUsersHomeComponent } from "./home/home.component";
import { BlockListUsersUserDetailComponent } from "./user-detail/user-detail.component";

const routes: Routes = [
    {
        path:'',
        component: BlockListUsersComponent,
        children:[
            {
                path:RouteNames.BLOCK_LIST_USERS_HOME,
                component:BlockListUsersHomeComponent,
            },{
                path:`${RouteNames.BLOCK_LIST_USERS_USER_DETAIL}/:id`,
                component:BlockListUsersUserDetailComponent,
            },
            {
                path:'',
                redirectTo:RouteNames.BLOCK_LIST_USERS_HOME,
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
        BlockListUsersComponent, 
        BlockListUsersHomeComponent,
        BlockListUsersUserDetailComponent,
    ],
    exports:[RouterModule],
    providers:[DatePipe],
})
export class BlockListUsersRoutingModule {}