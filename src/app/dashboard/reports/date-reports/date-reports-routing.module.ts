import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from "../../../shared/shared.module";

import { DateReportsComponent } from "./date-reports.component";
import { DateReportHomeComponent } from "./home/home.component";
import { DateReportDailyPostsComponent } from "./daily-posts/daily-posts.component";
import { DateReportDailyNewUsersComponent } from "./daily-new-users/daily-new-users.component";
import { DateReportMonthlyYearlyPostsComponent } from "./monthly-yearly-posts/monthly-yearly-posts.component";
import { DateReportMonthlyYearlyNewUsersComponent } from "./monthly-yearly-new-users/monthly-yearly-new-users.component";

import RouteNames from "src/app/core/helpers/route-names.helper";

const routes:Routes = [
    {
        path:'',
        component:DateReportsComponent,
        children:[
            {
                path:RouteNames.DATE_REPORT_HOME,
                component:DateReportHomeComponent,
            },
            {
                path:`${RouteNames.DATE_REPORT_DAILY_POSTS}/:invoker/:date`,
                component:DateReportDailyPostsComponent,
            },
            {
                path:`${RouteNames.DATE_REPORT_DAILY_NEW_USERS}/:invoker/:date`,
                component:DateReportDailyNewUsersComponent,
            },
            {
                path:`${RouteNames.DATE_REPORT_MONTHLY_YEARLY_POSTS}/:target/:invoker/:date`,
                component:DateReportMonthlyYearlyPostsComponent,
            },
            {
                path:`${RouteNames.DATE_REPORT_MONTHLY_YEARLY_NEW_USERS}/:target/:invoker/:date`,
                component:DateReportMonthlyYearlyNewUsersComponent,
            },
            {
                path:'',
                redirectTo:RouteNames.DATE_REPORT_HOME,
                pathMatch:'full',
            },
        ],
    },
];

@NgModule({
    imports:[
        RouterModule.forChild(routes),
        CommonModule, 
        FormsModule,
        SelectDropDownModule,
        NgxPaginationModule,
        SharedModule,
    ],
    declarations:[
        DateReportsComponent,
        DateReportHomeComponent,
        DateReportDailyPostsComponent,
        DateReportDailyNewUsersComponent,
        DateReportMonthlyYearlyPostsComponent,
        DateReportMonthlyYearlyNewUsersComponent,
    ],
    exports:[RouterModule],
    providers:[DatePipe],
})
export class DateReportsRoutingModule {}