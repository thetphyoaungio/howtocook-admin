import { NgModule, ModuleWithProviders, Optional, SkipSelf } from "@angular/core";

import { throwIfAlreadyLoaded } from "./module-import-guard";

import { 
    AuthService, 
    DashboardService, 
    UserService, 
    PostService,
    CommentService,
    CategoryService,
    AdminManageService,
    TipService,
    ReportsService,
    FeedBackService,
    SettingService,
} from "./services";

import { 
    SpinnerService, 
    HttpInterceptorService,
    LocalStorageService, 
    CryptoService, 
    HeaderMenuSidebarOnOffService, 
    DialogModalService, 
    MenuRouterService, 
    SessionStorageService,
    TPADateTimeService,
    ToastService, 
    GlobalSearchSubjectService,
} from "./utils";

export const CORE_PROVIDERS = [
    AuthService,
    UserService,
    DashboardService,
    PostService,
    CommentService,
    CategoryService,
    AdminManageService,
    TipService,
    ReportsService,
    FeedBackService,
    SettingService,

    SpinnerService,
    HttpInterceptorService,
    LocalStorageService, 
    CryptoService, 
    HeaderMenuSidebarOnOffService, 
    DialogModalService, 
    MenuRouterService,
    SessionStorageService, 
    TPADateTimeService,
    ToastService,
    GlobalSearchSubjectService,
];

@NgModule({
    imports:[],
    providers:[],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }

    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers:[
                ...CORE_PROVIDERS,
            ],
        };
    }
}
