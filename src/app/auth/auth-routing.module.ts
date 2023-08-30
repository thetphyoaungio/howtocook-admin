import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import RouteNames from '../core/helpers/route-names.helper';

import { AuthComponent } from './auth.component';
import { LoginLandingComponent } from './login-landing/login-landing.component';
import { LoginComponent } from './login/login.component';

const routes:Routes = [
    {
        path:'',
        component: AuthComponent,
        children:[
            {
                path:RouteNames.LOGIN_LANDING,
                component: LoginLandingComponent,
            }, 
            {
                path:RouteNames.LOGIN,
                component: LoginComponent,
            },
            {
                path:'',
                redirectTo: RouteNames.LOGIN_LANDING,
                pathMatch:'full',
            }
        ],
    }
];

@NgModule({
    imports:[
        RouterModule.forChild(routes), 
        FormsModule, 
        ReactiveFormsModule, 
        CommonModule, 
    ],
    declarations:[
        AuthComponent, 
        LoginLandingComponent,
        LoginComponent,
    ],
    exports:[RouterModule],
})
export class AuthRoutingModule {}

