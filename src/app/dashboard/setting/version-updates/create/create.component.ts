import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { 
    SpinnerService,
    DialogModalService,
    ToastService,
} from "src/app/core/utils";

import RouteNames from "src/app/core/helpers/route-names.helper";

import { SettingService } from "src/app/core/services";

@Component({
    templateUrl:'./create.component.html',
    styleUrls:['./create.component.scss']
})
export class SettingVersionUpdateCreateComponent implements OnInit, OnDestroy {
    createForm:FormGroup|any;

    toid1:any;

    constructor(
        private router:Router,
        private spinnerService:SpinnerService,
        private dialogService:DialogModalService,
        private toastService:ToastService,
        private settingService:SettingService,
        private fb:FormBuilder,
    ) {}

    ngOnInit(): void {
        this.buildForm();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
    }

    buildForm() {
        this.createForm = this.fb.group({
            ios_version:['', Validators.required],
            android_version:['', Validators.required],
            playstore_link:[''],
            appstore_link:[''],
            forceUpdate:[false]
        });
    }

    goToList() {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.SETTING}/${RouteNames.SETTING_VERSION_UPDATE_LIST}`]);
    }

    changeForceUpdate(evt:any) {
        this.createForm.patchValue({
            forceUpdate: evt.target.checked
        });
    }

    onCreate(formVal:any) {
        if(this.createForm.valid) {
            this.spinnerService.loading.next(true);

            const pl = {
                ios_version: formVal.ios_version,
                android_version: formVal.android_version,
                playstore_link: formVal.playstore_link || '',
                appstore_link: formVal.appstore_link || '', 
                forceUpdate: formVal.forceUpdate
            };

            this.settingService.create_VU(pl).subscribe({
                next:((res:any) => {
                    this.spinnerService.loading.next(false);

                    this.goToList();

                    this.toastService.showToast({
                        icon:'../../../../../assets/images/general/check-bg-green.svg',
                        title:'Created Version',
                        description:'you have been successfully created version.'
                    });
                }),
                error:(err => {
                    this.spinnerService.loading.next(false);
                    this.dialogService.showError(err);
                })
            });
        }
    }
}