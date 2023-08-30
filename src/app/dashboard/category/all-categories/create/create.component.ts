import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { 
    SpinnerService,
    DialogModalService,
    ToastService,
} from "src/app/core/utils";

import RouteNames from "src/app/core/helpers/route-names.helper";

import { CategoryService } from "src/app/core/services";

@Component({
    templateUrl:'./create.component.html',
    styleUrls:['./create.component.scss']
})
export class CategoriesCreateComponent implements OnInit, OnDestroy {
    createForm:FormGroup|any;

    toid1:any;

    constructor(
        private router:Router,
        private spinnerService:SpinnerService,
        private dialogService:DialogModalService,
        private toastService:ToastService,
        private categoryService:CategoryService,
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
            name:['', Validators.required],
            isPublic:[true]
        });
    }

    goToList() {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.CATEGORIES}`]);
    }

    changeIsPublic(evt:any) {
        this.createForm.patchValue({
            isPublic: evt.target.checked
        });
    }

    onCreate(formVal:any) {
        if(this.createForm.valid) {
            this.spinnerService.loading.next(true);

            const pl = new FormData();
            pl.append('name', formVal.name);
            pl.append('isPublic', formVal.isPublic);
            pl.append('photo','');
            pl.append('requestStatus','1');

            this.categoryService.createCategory(pl).subscribe({
                next:((res:any) => {
                    this.spinnerService.loading.next(false);

                    this.goToList();

                    this.toastService.showToast({
                        icon:'../../../../../assets/images/general/check-bg-green.svg',
                        title:'Created Category',
                        description:'you have been successfully created category.'
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