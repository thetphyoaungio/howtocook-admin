import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DatePipe, CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxPaginationModule } from "ngx-pagination";
import { SelectDropDownModule } from "ngx-select-dropdown";

import { SharedModule } from "src/app/shared/shared.module";

import { SettingFAQsComponent } from "./faqs.component";
import { SettingFAQsHomeComponent } from "./home/home.component";
import { SettingFAQsCreateComponent } from "./create/create.component";
import { SettingFAQsEditComponent } from "./edit/edit.component";

import RouteNames from "src/app/core/helpers/route-names.helper";

const routes:Routes = [
    {
        path:'',
        component:SettingFAQsComponent,
        children:[
            {
                path:RouteNames.SETTING_FAQS_LIST_HOME,
                component:SettingFAQsHomeComponent
            },
            {
                path:RouteNames.SETTING_FAQS_CREATE,
                component:SettingFAQsCreateComponent
            },
            {
                path:`${RouteNames.SETTING_FAQS_EDIT}/:id`,
                component:SettingFAQsEditComponent
            },
            {
                path:'',
                redirectTo:RouteNames.SETTING_FAQS_LIST_HOME,
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
        SettingFAQsComponent,
        SettingFAQsHomeComponent,
        SettingFAQsCreateComponent,
        SettingFAQsEditComponent,
    ],
    exports:[RouterModule],
    providers:[DatePipe],
})
export class SettingFAQsRoutingModule {}