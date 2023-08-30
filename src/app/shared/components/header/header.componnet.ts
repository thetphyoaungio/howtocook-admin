import { Component } from "@angular/core";
import { Router } from "@angular/router";
import RouteNames from "src/app/core/helpers/route-names.helper";

import { 
    HeaderMenuSidebarOnOffService,
    LocalStorageService, 
    CryptoService,
} from "src/app/core/utils";

@Component({
    selector:'htc-header',
    templateUrl:'./header.componnet.html',
    styleUrls:['./header.componnet.scss']
})
export class HeaderComponent {
    loggedInUser:any;

    constructor(
        private headerMenuSidebarOnOffService:HeaderMenuSidebarOnOffService,
        private router:Router,
        private localService:LocalStorageService,
        private cryptoService:CryptoService,
    ) {
        const t = this.localService.getLoggedInUser();
        if(t) {
            this.loggedInUser = {...(JSON.parse(this.cryptoService.decrypt(t)))}
        }
    }
    
    onSearch(evt:any) {}

    onMenuSidebarColExp() {
        const mswidth = (<HTMLElement|any>document.getElementById("mySidenav")).style.width;

        const htcsidenavp2 = <HTMLElement>document.getElementById('htc-menu-sidebarElid');
        
        if(!mswidth || mswidth === '270px') {//* collapse!
            this.headerMenuSidebarOnOffService.menusidebarStage.next(0);

            (<HTMLElement|any>document.getElementById("mySidenav")).style.width = "55px";
            
            htcsidenavp2.setAttribute('class','p-2 padding-no menu-p-2-collapse');

        } else {//* expend!
            this.headerMenuSidebarOnOffService.menusidebarStage.next(1);

            (<HTMLElement|any>document.getElementById("mySidenav")).style.width = "270px";
            
            htcsidenavp2.setAttribute('class','p-2 padding-no menu-p-2');
        }
    }

    gotoProfileUpdate() {
        this.router.navigate([`${RouteNames.DASHBOARD}/${RouteNames.PROFILE_UPDATE}`]);
    }
}