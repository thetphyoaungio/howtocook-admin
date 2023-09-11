import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DatePipe, CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxPaginationModule } from "ngx-pagination";
import { SelectDropDownModule } from "ngx-select-dropdown";

import { SharedModule } from "src/app/shared/shared.module";

import { SettingCustomAdsComponent } from "./custom-ads.component";
import { SettingCustomAdsHomeComponent } from "./home/home.component";
import { SettingCustomAdsCreateComponent } from "./create/create.component";
import { SettingCustomAdsEditComponent } from "./edit/edit.component";

import RouteNames from "src/app/core/helpers/route-names.helper";

const routes:Routes = [
    {
        path:'',
        component:SettingCustomAdsComponent,
        children:[
            {
                path:RouteNames.SETTING_CUSTOM_ADS_LIST_HOME,
                component:SettingCustomAdsHomeComponent
            },
            {
                path:RouteNames.SETTING_CUSTOM_ADS_CREATE,
                component:SettingCustomAdsCreateComponent
            },
            {
                path:`${RouteNames.SETTING_CUSTOM_ADS_EDIT}/:id`,
                component:SettingCustomAdsEditComponent
            },
            {
                path:'',
                redirectTo:RouteNames.SETTING_CUSTOM_ADS_LIST_HOME,
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
        ReactiveFormsModule,
        NgxPaginationModule,
        SelectDropDownModule,
        SharedModule,
    ],
    declarations:[
        SettingCustomAdsComponent,
        SettingCustomAdsHomeComponent,
        SettingCustomAdsCreateComponent,
        SettingCustomAdsEditComponent,
    ],
    exports:[RouterModule],
    providers:[DatePipe],
})
export class SettingCustomAdsRoutingModule {}