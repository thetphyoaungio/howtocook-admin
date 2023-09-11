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
export class SettingFAQsCreateComponent implements OnInit, OnDestroy {
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
            title:['', Validators.required],
            description:['', Validators.required],
        });
    }

    goToList() {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.SETTING}`]);
    }

    onCreate(formVal:any) {
        if(this.createForm.valid) {
            this.spinnerService.loading.next(true);

            const pl = {
                title: formVal.title,
                description: formVal.description
            }

            this.settingService.create_Faqs(pl).subscribe({
                next:((res:any) => {
                    this.spinnerService.loading.next(false);

                    this.goToList();

                    this.toastService.showToast({
                        icon:'../../../../../assets/images/general/check-bg-green.svg',
                        title:'Created FAQ',
                        description:'you have been successfully created FAQ.'
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