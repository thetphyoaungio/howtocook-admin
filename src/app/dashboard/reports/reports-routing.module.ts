import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from "../../shared/shared.module";

import { ReportsComponent } from "./reports.component";
import { AdsReportComponent } from "./ads-report/ads-report.component";
import { NewUsersReportComponent } from "./new-users-report/new-users-report.component";
import { UsersReportComponent } from "./users-report/users-report.component";
import { ChefUsersReportComponent } from "./chef-users-report/chef-users-report.component";

import RouteNames from "src/app/core/helpers/route-names.helper";

const routes:Routes = [
    {
        path:'',
        component:ReportsComponent,
        children:[
            /* {
                path:RouteNames.ADS_REPORT,
                component:AdsReportComponent,
            }, */
            {
                path:RouteNames.NEW_USERS_REPORT,
                component:NewUsersReportComponent,
            },
            {
                path:RouteNames.DATE_REPORT,
                loadChildren:() => import('./date-reports/date-reports.module')
                .then(m => m.DateReportsModule)
            },
            {
                path:RouteNames.USERS_REPORT,
                component:UsersReportComponent,
            },
            {
                path:RouteNames.CHEF_USERS_REPORT,
                component:ChefUsersReportComponent,
            },
            {
                path:'',
                redirectTo:RouteNames.NEW_USERS_REPORT,
                pathMatch:'full',
            },
        ],
    },
];

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        SelectDropDownModule,
        NgxPaginationModule,
        SharedModule, 
        RouterModule.forChild(routes),
    ],
    declarations:[
        ReportsComponent,
        AdsReportComponent,
        NewUsersReportComponent,
        UsersReportComponent,
        ChefUsersReportComponent,
    ],
    exports:[RouterModule],
    providers:[DatePipe],
})
export class ReportsRoutingModule {}