import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { 
    LocalStorageService,
    CryptoService, 
} from "src/app/core/utils";

import RouteNames from "src/app/core/helpers/route-names.helper";

@Component({
    templateUrl:'./profile.component.html',
    styleUrls:['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    profileData:any;

    toid1:any;

    constructor(
        private router:Router, 
        private localService:LocalStorageService,
        private cryptoService:CryptoService,
    ) {}

    ngOnInit(): void {
        this.getProfileUser();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
    }

    updateNow() {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.ADMIN_MANAGEMENT}/${RouteNames.ADMIN_LIST}/${RouteNames.ADMIN_EDIT}`, this.profileData.id, 'profile-detail']);
    }

    getProfileUser() {
        const t = this.localService.getLoggedInUser();

        if(t) {
            const tmp = {
                ...(JSON.parse(this.cryptoService.decrypt(t)))
            }

            this.profileData = {
                ...tmp,
                status: tmp.status ? "Active" : "Inactive",
            }
        } 
    }
}