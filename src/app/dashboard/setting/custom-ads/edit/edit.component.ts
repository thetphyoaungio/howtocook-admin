import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
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
    templateUrl:'./edit.component.html',
    styleUrls:['./edit.component.scss']
})
export class SettingCustomAdsEditComponent implements OnInit, OnDestroy {
    id$:string|any;
    editForm:FormGroup|any;
    editData:any;

    imgPreview:string|any;
    adsImageFile:any;

    toid1:any;
    toid2:any;

    constructor(
        private router:Router,
        private spinnerService:SpinnerService,
        private dialogService:DialogModalService,
        private toastService:ToastService,
        private settingService:SettingService,
        private fb:FormBuilder,
        private domSanitizer:DomSanitizer, 
        private route:ActivatedRoute,
    ) {
        this.route.params.subscribe({
            next:((params:any) => {
                this.id$ = params.id;
            })
        });

        this.buildForm();
    }

    ngOnInit(): void {
        this.getEditData();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
        if(this.toid2) clearTimeout(this.toid2);
    }

    buildForm() {
        this.editForm = this.fb.group({
            url:['', Validators.required],
            isActive:[false]
        });
    }

    getEditData() {
        this.spinnerService.loading.next(true);

        this.settingService.getDetailById(`?id=${this.id$}`).subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);

                if(res.success) {
                    this.editData = {...res.data};

                    this.toid2 = setTimeout(() => {
                        this.imgPreview = res.data?.photo;

                        this.editForm.patchValue({
                            url:res.data.url,
                            isActive:res.data.isActive
                        });

                    }, 0);
                    
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
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.SETTING}/${RouteNames.SETTING_CUSTOM_ADS_LIST}`]);
    }

    changeIsActive(evt:any) {
        this.editForm.patchValue({
            isActive: evt.target.checked
        });
    }

    onUpdate(formVal:any) {
        if(this.editForm.valid) {
            this.spinnerService.loading.next(true);

            const pl = new FormData();
            pl.append('id', this.id$);
            pl.append('url', formVal.url);
            pl.append('isActive', formVal.isActive);
            pl.append('photo', this.adsImageFile || this.editData.photo);

            this.settingService.update(pl).subscribe({
                next:((res:any) => {
                    this.spinnerService.loading.next(false);

                    this.goToList();

                    this.toastService.showToast({
                        icon:'../../../../../assets/images/general/check-bg-green.svg',
                        title:'Updated Custom Ads',
                        description:'you have been successfully updated custom Ads.'
                    });
                }),
                error:(err => {
                    this.spinnerService.loading.next(false);
                    this.dialogService.showError(err);
                })
            });
        }
    }

    onCancel() {
        this.goToList();
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