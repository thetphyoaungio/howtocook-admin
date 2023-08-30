import { Component, AfterViewInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import RouteNames from "src/app/core/helpers/route-names.helper";

import { 
    LocalStorageService, 
} from "src/app/core/utils";

@Component({
    templateUrl:'./login-landing.component.html',
    styleUrls:['./login-landing.component.scss']
})
export class LoginLandingComponent implements AfterViewInit, OnDestroy {
    bodyEl:HTMLElement|any;

    constructor(
        private router:Router,
        private localService:LocalStorageService,
    ) {
        const t = this.localService.getToken();
        if(t) {
            this.router.navigate([`/${RouteNames.DASHBOARD}`]);
        }
    }

    ngAfterViewInit(): void {
        this.setOverflowOfBodyEl();
    }

    ngOnDestroy(): void {
        if(this.bodyEl){
            this.bodyEl.style.overflowY = 'hidden';
            this.bodyEl.style.overflow = 'hidden';
        }
    }

    gotoForm() {
        this.router.navigate([`/${RouteNames.AUTH}/${RouteNames.LOGIN}`]);
    }

    setOverflowOfBodyEl() {
        this.bodyEl = <HTMLElement>document.querySelector('body');
        if(this.bodyEl){
            this.bodyEl.style.overflowY = 'auto';
        }
    }
}