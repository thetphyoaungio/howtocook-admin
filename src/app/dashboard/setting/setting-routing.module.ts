import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SettingsComponent } from "./setting.component";

import RouteNames from "src/app/core/helpers/route-names.helper";

const routes:Routes = [
    {
        path:'',
        component:SettingsComponent,
        children:[
            {
                path:RouteNames.SETTING_FAQS_LIST,
                loadChildren:() => import('./faqs/faqs.module')
                .then(m => m.SettingFAQsModule)
            },
            {
                path:RouteNames.SETTING_CUSTOM_ADS_LIST,
                loadChildren:() => import('./custom-ads/custom-ads.module')
                .then(m => m.SettingCustomAdsModule)
            },
            {
                path:RouteNames.SETTING_VERSION_UPDATE_LIST,
                loadChildren:() => import('./version-updates/version-updates.module')
                .then(m => m.SettingVersionUpdateModule)
            },
            {
                path:'',
                redirectTo:RouteNames.SETTING_FAQS_LIST,
                pathMatch:'full',
            },
        ],
    },
];

@NgModule({
    imports:[
        RouterModule.forChild(routes),
    ],
    declarations:[SettingsComponent],
    exports:[RouterModule],
})
export class SettingsRoutingModule {}