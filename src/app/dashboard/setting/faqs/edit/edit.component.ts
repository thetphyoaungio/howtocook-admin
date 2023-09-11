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
export class SettingFAQsEditComponent implements OnInit, OnDestroy {
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
            title:['', Validators.required],
            description:['', Validators.required],
        });
    }

    getEditData() {
        this.spinnerService.loading.next(true);

        this.settingService.getDetailById_Faqs(`?id=${this.id$}`).subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);

                if(res.success) {
                    this.editData = {...res.data};

                    this.editForm.patchValue({
                        title:res.data.title,
                        description:res.data.description
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
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.SETTING}`]);
    }

    onCancel(){
        this.goToList();
    }

    onUpdate(formValue:any) {
        if(this.editForm.valid) {

            this.spinnerService.loading.next(true);

            const pl = {
                id: this.id$,
                title: formValue.title,
                description: formValue.description
            };
            
            this.settingService.update_Faqs(pl).subscribe({
                next:((res:any) => {
                    this.spinnerService.loading.next(false);

                    this.goToList();

                    this.toastService.showToast({
                        icon:'../../../../../assets/images/general/check-bg-green.svg',
                        title:'Updated FAQ',
                        description:'you have been successfully updated FAQ.'
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