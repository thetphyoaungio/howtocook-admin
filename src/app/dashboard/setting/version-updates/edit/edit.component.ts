import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { 
    SpinnerService,
    DialogModalService,
    ToastService,
} from "src/app/core/utils";

import RouteNames from "src/app/core/helpers/route-names.helper";

import { SettingService } from "src/app/core/services";

@Component({
    templateUrl:'./edit.component.html',
    styleUrls:['./edit.component.scss']
})
export class SettingVersionUpdateEditComponent implements OnInit, OnDestroy {
    id$:any;

    editData:any;
    editForm:FormGroup|any;

    constructor(
        private router:Router,
        private spinnerService:SpinnerService,
        private dialogService:DialogModalService,
        private toastService:ToastService,
        private settingService:SettingService,
        private fb:FormBuilder,
        private route:ActivatedRoute,
    ) {
        this.route.params.subscribe({
            next:((params:any) => this.id$ = params.id)
        });

        this.buildForm();
    }

    ngOnInit(): void {
        this.getEditData();
    }

    ngOnDestroy(): void {
        
    }

    buildForm() {
        this.editForm = this.fb.group({
            ios_version:['', Validators.required],
            android_version:['', Validators.required],
            playstore_link:[''],
            appstore_link:[''],
            forceUpdate:[false]
        });
    }

    getEditData() {
        this.spinnerService.loading.next(true);

        this.settingService.getDetailById_VU(`?id=${this.id$}`).subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);

                if(res.success) {
                    this.editData = {...res.data};

                    this.editForm.patchValue({
                        ios_version: res.data.ios_version,
                        android_version: res.data.android_version,
                        playstore_link: res.data.playstore_link,
                        appstore_link: res.data.appstore_link,
                        forceUpdate: res.data.forceUpdate
                    });
                } else {
                    this.dialogService.showError({status:'Error', statusText:res.message});
                }
                
            }),
            error:(err => {
                this.spinnerService.loading.next(false);
                if(err.status!=500) {
                    this.dialogService.showError(err);
                }
            })
        });
    }


    goToList() {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.SETTING}/${RouteNames.SETTING_VERSION_UPDATE_LIST}`]);
    }

    changeForceUpdate(evt:any){
        this.editForm.patchValue({
            forceUpdate:evt.target.checked
        });
    }

    onCancel(){
        this.goToList();
    }

    onUpdate(formValue:any) {
        if(this.editForm.valid) {

            this.spinnerService.loading.next(true);

            const pl = {
                id: this.id$,
                ios_version: formValue.ios_version,
                android_version: formValue.android_version,
                playstore_link: formValue.playstore_link || '',
                appstore_link: formValue.appstore_link || '', 
                forceUpdate: formValue.forceUpdate
            };
            
            this.settingService.update_VU(pl).subscribe({
                next:((res:any) => {
                    this.spinnerService.loading.next(false);

                    this.goToList();

                    this.toastService.showToast({
                        icon:'../../../../../assets/images/general/check-bg-green.svg',
                        title:'Updated Version',
                        description:'you have been successfully updated version.'
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