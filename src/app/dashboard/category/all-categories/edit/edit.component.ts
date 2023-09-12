import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { 
    SpinnerService,
    DialogModalService,
    ToastService,
} from "src/app/core/utils";

import RouteNames from "src/app/core/helpers/route-names.helper";

import { CategoryService } from "src/app/core/services";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    templateUrl:'./edit.component.html',
    styleUrls:['./edit.component.scss']
})
export class CategoriesEditComponent implements OnInit, OnDestroy {
    cateId:any;
    editData:any;
    editForm:FormGroup|any;

    photoPreview:any;
    uploadedPhoto:any;

    toid1:any;

    constructor(
        private router:Router,
        private spinnerService:SpinnerService,
        private dialogService:DialogModalService,
        private toastService:ToastService,
        private categoryService:CategoryService,
        private fb:FormBuilder,
        private route:ActivatedRoute,
        private domSanitizer:DomSanitizer, 
    ) {
        this.route.params.subscribe({
            next:((params:any) => this.cateId = params.id)
        });

        this.buildForm();
    }

    ngOnInit(): void {
        this.getEditData();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
    }

    buildForm() {
        this.editForm = this.fb.group({
            name:['', Validators.required],
            isPublic:[false]
        });
    }

    getEditData() {
        this.spinnerService.loading.next(true);

        this.categoryService.getById(`?id=${this.cateId}`).subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);

                if(res.success) {
                    this.editData = {...res.data};

                    this.toid1 = setTimeout(() => {
                        this.photoPreview = res.data?.photo;

                        this.editForm.patchValue({
                            name:res.data.name,
                            isPublic:res.data.isPublic
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
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.CATEGORIES}`]);
    }

    changeIsPublic(evt:any){
        this.editForm.patchValue({
            isPublic:evt.target.checked
        });
    }

    onCancelUpdte(){
        this.goToList();
    }

    onUpdate(formValue:any) {
        if(this.editForm.valid) {

            this.spinnerService.loading.next(true);

            const pl = new FormData();
            
            pl.append('id', this.cateId);
            pl.append('name', formValue.name);
            pl.append('isPublic', formValue.isPublic);
            pl.append('requestStatus', this.editData.requestStatus);
            pl.append('photo', this.uploadedPhoto || this.editData.photo);
            
            this.categoryService.updateCategory(pl).subscribe({
                next:((res:any) => {
                    this.spinnerService.loading.next(false);

                    this.goToList();

                    this.toastService.showToast({
                        icon:'../../../../../assets/images/general/check-bg-green.svg',
                        title:'Updated Category',
                        description:'you have been successfully updated category.'
                    });
                }),
                error:(err => {
                    this.spinnerService.loading.next(false);
                    this.dialogService.showError(err);
                })
            });
        }
    }

    addPhoto(evt:any) {
        this.uploadedPhoto = undefined;
        this.uploadedPhoto = <File>evt.target.files[0];
        
        const selectedFiles = evt.target.files;
    
        if (selectedFiles && selectedFiles[0]) {
            const numberOfFiles = selectedFiles.length;
            
            for (let i = 0; i < numberOfFiles; i++) {
                const reader = new FileReader();

                reader.onload = (e: any) => {
                    this.photoPreview = undefined;
                    this.photoPreview = this.domSanitizer.bypassSecurityTrustResourceUrl(e.target.result);
                };
                
                reader.readAsDataURL(selectedFiles[i]);
            }
        }
    }
}