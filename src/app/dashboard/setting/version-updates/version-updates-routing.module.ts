import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DatePipe, CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxPaginationModule } from "ngx-pagination";
import { SelectDropDownModule } from "ngx-select-dropdown";

import { SharedModule } from "src/app/shared/shared.module";

import { SettingVersionUpdateComponent } from "./version-updates.component";
import { SettingVersionUpdateHomeComponent } from "./home/home.component";
import { SettingVersionUpdateCreateComponent } from "./create/create.component";
import { SettingVersionUpdateEditComponent } from "./edit/edit.component";

import RouteNames from "src/app/core/helpers/route-names.helper";

const routes:Routes = [
    {
        path:'',
        component:SettingVersionUpdateComponent,
        children:[
            {
                path:RouteNames.SETTING_VERSION_UPDATE_LIST_HOME,
                component:SettingVersionUpdateHomeComponent
            },
            {
                path:RouteNames.SETTING_VERSION_UPDATE_CREATE,
                component:SettingVersionUpdateCreateComponent
            },
            {
                path:`${RouteNames.SETTING_VERSION_UPDATE_EDIT}/:id`,
                component:SettingVersionUpdateEditComponent
            },
            {
                path:'',
                redirectTo:RouteNames.SETTING_VERSION_UPDATE_LIST_HOME,
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
        SettingVersionUpdateComponent,
        SettingVersionUpdateHomeComponent,
        SettingVersionUpdateCreateComponent,
        SettingVersionUpdateEditComponent,
    ],
    exports:[RouterModule],
    providers:[DatePipe],
})
export class SettingVersionUpdateRoutingModule {}