import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';

import { UsersComponent } from './users.component';

import RouteNames from 'src/app/core/helpers/route-names.helper';

const routes:Routes = [
    {
        path:'',
        component:UsersComponent,
        children:[
            {
                path:RouteNames.ALL_USERS,
                loadChildren: () => import('./all-users/all-users.module')
                .then(m => m.AllUsersModule)
            },
            {
                path:RouteNames.NORMAL_USERS,
                loadChildren:() => import('./normal-users/normal-users.module')
                .then(m => m.NormalUsersModule)
            },
            {
                path:RouteNames.CHEF_USERS,
                loadChildren:() => import('./chef-users/chef-users.module')
                .then(m => m.ChefUsersModule)
            },
            {
                path:RouteNames.REQUEST_CHEF_USERS,
                loadChildren:() => import('./requested-chef-users/requested-chef-users.module')
                .then(m => m.RequestChefUsersModule)
            },
            {
                path:RouteNames.BLOCK_LIST_USERS,
                loadChildren:() => import('./block-list-users/block-list-users.module')
                .then(m => m.BlockListUsersModule)
            },
            {
                path:'',
                redirectTo:RouteNames.ALL_USERS,
                pathMatch:'full',
            }
        ],
    }
];

@NgModule({
    imports:[
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        SelectDropDownModule,
        NgxPaginationModule,
    ],
    exports:[RouterModule],
    declarations:[
        UsersComponent,
    ],
})
export class UsersRoutingModule {}