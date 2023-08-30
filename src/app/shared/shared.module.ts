import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SelectDropDownModule } from "ngx-select-dropdown";
import { NgxPaginationModule } from "ngx-pagination";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { setTheme } from 'ngx-bootstrap/utils';
setTheme('bs4');

import { HeaderComponent } from "./components/header/header.componnet";
import { MenuSideBarComponent } from "./components/menu-side-bar/menu-side-bar.component";
import { DashboardLogoTitleComponent } from "./components/dashboard-log-title/dashboard-log-title.component";
import { MenuItemsContainerComponent } from "./components/menu-items-container/menu-items-container.component";
import { VisitorsChartComponent } from "./components/charts/visitors/visitors-chart.component";
import { DashboardHomeInfoCardComponent } from "./components/dashboard-home-info-card/dashboard-home-info-card.component";
import { ProfileTitlePhotoComponent } from "./components/profile-title-photo/profile-title-photo.component";
import { ActiveInactiveStatusComponent } from "./components/active-inactive-status/active-inactive-status.component";
import { ThereIsNoComponent } from "./components/there-is-no/there-is-no.component";
import { LoadingDataComponent } from "./components/loading-data/loading-data.component";
import { UsersTableComponent } from "./components/users-table/users-table.component";
import { HTCDatePickerComponent } from "./components/date-time-pickers/date-picker/date-picker.component";
import { HTCGlobalSearchComponent } from "./components/global-search/global-search.component";
import { HTCDateTimePeriodDropDownComponent } from "./components/date-time-pickers/datetime-period-dropdown/datetime-period-dropdown.component";
import { TableCellUserInfoComponent } from "./components/table-cell-user-info/table-cell-user-info.component";
import { HTCMonthYearPickerComponent } from "./components/date-time-pickers/month-year-picker/month-year-picker.component";
import { HTCExportButtonComponent } from "./components/export-button/export-button.component";
import { HTCFromToDatePickerComponent } from "./components/date-time-pickers/from-to-date-picker/from-to-date-picker.component";

@NgModule({
    imports:[
        CommonModule, 
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SelectDropDownModule,
        NgxPaginationModule,
        NgxDaterangepickerMd.forRoot(),
        BsDatepickerModule.forRoot(),
    ], 
    declarations:[
        HeaderComponent, 
        MenuSideBarComponent, 
        DashboardLogoTitleComponent,
        MenuItemsContainerComponent,
        VisitorsChartComponent,
        DashboardHomeInfoCardComponent,
        ProfileTitlePhotoComponent,
        ActiveInactiveStatusComponent,
        ThereIsNoComponent,
        LoadingDataComponent,
        UsersTableComponent,
        HTCDatePickerComponent,
        HTCGlobalSearchComponent,
        HTCDateTimePeriodDropDownComponent,
        TableCellUserInfoComponent,
        HTCMonthYearPickerComponent,
        HTCExportButtonComponent,
        HTCFromToDatePickerComponent,
    ],
    exports:[
        HeaderComponent, 
        MenuSideBarComponent, 
        DashboardLogoTitleComponent,
        MenuItemsContainerComponent,
        VisitorsChartComponent,
        DashboardHomeInfoCardComponent,
        ProfileTitlePhotoComponent,
        ActiveInactiveStatusComponent,
        ThereIsNoComponent,
        LoadingDataComponent,
        UsersTableComponent,
        HTCDatePickerComponent,
        HTCGlobalSearchComponent,
        HTCDateTimePeriodDropDownComponent,
        TableCellUserInfoComponent,
        HTCMonthYearPickerComponent,
        HTCExportButtonComponent,
        HTCFromToDatePickerComponent,
    ],
    providers:[DatePipe],
})
export class SharedModule {}