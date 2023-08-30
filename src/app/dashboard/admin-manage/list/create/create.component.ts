import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { 
    SpinnerService, 
    DialogModalService, 
    ToastService,
} from "src/app/core/utils";

import { AdminManageService } from "src/app/core/services";
import RouteNames from "src/app/core/helpers/route-names.helper";

@Component({
    templateUrl:'./create.component.html',
})
export class AdminListCreateComponent implements OnInit {
    createForm:FormGroup|any;

    profilePreView:string|any;
    profileImgFile:any;

    constructor(
        private fb:FormBuilder,
        private spinnerService:SpinnerService,
        private adminService:AdminManageService,
        private domSanitizer:DomSanitizer, 
        private dialogMService:DialogModalService, 
        private router:Router,
        private toastService:ToastService,
    ) {}

    ngOnInit(): void {
        this.buildForm();
    }

    addAdminPhoto(evt:any) {
        this.profileImgFile = undefined;
        this.profileImgFile = <File>evt.target.files[0];
        
        const selectedFiles = evt.target.files;
    
        if (selectedFiles && selectedFiles[0]) {
            const numberOfFiles = selectedFiles.length;
            
            for (let i = 0; i < numberOfFiles; i++) {
                const reader = new FileReader();

                reader.onload = (e: any) => {
                    this.profilePreView = undefined;
                    this.profilePreView = this.domSanitizer.bypassSecurityTrustResourceUrl(e.target.result);
                };
                
                reader.readAsDataURL(selectedFiles[i]);
            }
        }
    }

    goToList() {this.router.navigate([`${RouteNames.DASHBOARD}/${RouteNames.ADMIN_MANAGEMENT}`]);}

    buildForm() {
        this.createForm = this.fb.group({
            userName:['', Validators.required],
            loginName:['', Validators.required],
            phoneNumber:['', Validators.required],
            password:['', Validators.required]
        });
    }

    onCreate(formVal:any) {
        if(this.createForm.valid && this.profileImgFile) {

            this.spinnerService.loading.next(true);

            const pl = new FormData();
            pl.append('loginName', formVal.loginName);
            pl.append('userName', formVal.userName);
            pl.append('password', formVal.password);
            pl.append('phoneNumber', formVal.phoneNumber);
            pl.append('profile', this.profileImgFile);

            this.adminService.createAdminUser(pl).subscribe({
                next:((res:any) => {
                    this.spinnerService.loading.next(false);
                    
                    this.goToList();

                    this.toastService.showToast({
                        icon:'../../../../../assets/images/general/check-bg-green.svg',
                        title:'Created Admin Account',
                        description:'you have been successfully created admin account.'
                    });
                }),
                error: (err => {
                    this.spinnerService.loading.next(false);

                    this.dialogMService.showError(err);
                })
            });
        }
    }

    onKeyPress(evt:any){
        if(evt.key==='0') return;
        
        if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57 || 
            (evt.which===48 && !evt.target.value)){
            evt.preventDefault();
        }
    }
}