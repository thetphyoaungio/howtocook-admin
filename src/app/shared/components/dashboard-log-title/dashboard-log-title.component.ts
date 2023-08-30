import { Component } from "@angular/core";

import { HeaderMenuSidebarOnOffService } from "src/app/core/utils";

@Component({
    selector:'dashboard-logo-title',
    templateUrl:'./dashboard-log-title.component.html',
    styleUrls:['./dashboard-log-title.component.scss']
})
export class DashboardLogoTitleComponent {
    isMenuCollapse = false;

    constructor(private headerMenuSidebarOnOffService:HeaderMenuSidebarOnOffService){
        this.headerMenuSidebarOnOffService.menusidebarStage.subscribe({
            next:(v => {
                this.isMenuCollapse = v === 0;
            })
        });
    }
}