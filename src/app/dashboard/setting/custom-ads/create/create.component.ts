import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";

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
export class SettingCustomAdsCreateComponent implements OnInit, OnDestroy {
    createForm:FormGroup|any;

    imgPreview:string|any;
    adsImageFile:any;

    toid1:any;

    constructor(
        private router:Router,
        private spinnerService:SpinnerService,
        private dialogService:DialogModalService,
        private toastService:ToastService,
        private settingService:SettingService,
        private fb:FormBuilder,
        private domSanitizer:DomSanitizer, 
    ) {}

    ngOnInit(): void {
        this.buildForm();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
    }

    buildForm() {
        this.createForm = this.fb.group({
            url:['', Validators.required],
            isActive:[true]
        });
    }

    goToList() {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.SETTING}/${RouteNames.SETTING_CUSTOM_ADS_LIST}`]);
    }

    changeIsActive(evt:any) {
        this.createForm.patchValue({
            isActive: evt.target.checked
        });
    }

    onCreate(formVal:any) {
        if(this.createForm.valid) {
            this.spinnerService.loading.next(true);

            const pl = new FormData();
            pl.append('url', formVal.url);
            pl.append('isActive', formVal.isActive);
            pl.append('photo', this.adsImageFile);

            this.settingService.create(pl).subscribe({
                next:((res:any) => {
                    this.spinnerService.loading.next(false);

                    this.goToList();

                    this.toastService.showToast({
                        icon:'../../../../../assets/images/general/check-bg-green.svg',
                        title:'Created Custom Ads',
                        description:'you have been successfully created custom Ads.'
                    });
                }),
                error:(err => {
                    this.spinnerService.loading.next(false);
                    this.dialogService.showError(err);
                })
            });
        }
    }

    //
    addAdsPhoto(evt:any) {
        this.adsImageFile = undefined;
        this.adsImageFile = <File>evt.target.files[0];
        
        const selectedFiles = evt.target.files;
    
        if (selectedFiles && selectedFiles[0]) {
            const numberOfFiles = selectedFiles.length;
            
            for (let i = 0; i < numberOfFiles; i++) {
                const reader = new FileReader();

                reader.onload = (e: any) => {
                    this.imgPreview = undefined;
                    this.imgPreview = this.domSanitizer.bypassSecurityTrustResourceUrl(e.target.result);
                };
                
                reader.readAsDataURL(selectedFiles[i]);
            }
        }
    }
}