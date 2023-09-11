import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";

import RouteNames from "../core/helpers/route-names.helper";

import { DashboardComponent } from "./dashboard.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
    {
        path:'',
        component: DashboardComponent,
        children:[
            {
                path:RouteNames.HOME,
                component:HomeComponent,
            },
            {
                path:RouteNames.USERS,
                loadChildren:() => import('./users/users.module')
                .then(m => m.UsersModule)
            },
            {
                path:RouteNames.ADMIN_MANAGEMENT,
                loadChildren:() => import('./admin-manage/admin-manage.module')
                .then(m => m.AdminManageModule)
            },
            {
                path:RouteNames.CATEGORIES,
                loadChildren:() => import('./category/category.module')
                .then(m => m.CategoryModule)
            },
            {
                path:RouteNames.TIPS,
                loadChildren:() => import('./tips/tips.module')
                .then(m => m.TipsModule)
            },
            {
                path:RouteNames.PROFILE_UPDATE,
                component:ProfileComponent,
            },
            {
                path:RouteNames.REPORTS,
                loadChildren:() => import('./reports/reports.module')
                .then(m => m.ReportsModule)
            },
            {
                path:RouteNames.CUSTOM_FEEDBACK,
                loadChildren:() => import('./feedback/feedback.module')
                .then(m => m.FeedBackModule)
            },
            {
                path:RouteNames.SETTING,
                loadChildren:() => import('./setting/setting.module')
                .then(m => m.SettingsModule)
            },
            {
                path:'',
                redirectTo:RouteNames.HOME,
                pathMatch:'full',
            }
        ]
    }
]

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        SharedModule, 
    ],
    declarations:[
        DashboardComponent, 
        HomeComponent,
        ProfileComponent,
    ],
    exports:[RouterModule],
    providers:[DatePipe],
})
export class DashboardRoutingModule {}