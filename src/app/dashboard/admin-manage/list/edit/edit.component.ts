import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { DatePipe } from "@angular/common";

import { 
    SpinnerService, 
    DialogModalService,
    ToastService,
    TPADateTimeService,
} from "src/app/core/utils";

import { AdminManageService } from "src/app/core/services";

import RouteNames from "src/app/core/helpers/route-names.helper";

@Component({
    templateUrl:'./edit.component.html',
})
export class AdminListEditComponent implements OnInit, OnDestroy {
    adminId:any;
    adminDetail:any;
    profilePreview:string|any;
    profileImgFile:any;

    editForm:FormGroup|any;

    returnTarget:any;

    toid1:any;

    constructor(
        private spinnerService:SpinnerService,
        private dialogService:DialogModalService,
        private toastService:ToastService,
        private router:Router,
        private domSanitizer:DomSanitizer,
        private fb:FormBuilder,
        private adminService:AdminManageService,
        private route:ActivatedRoute,
        private datePipe:DatePipe,
        private dateTimeService:TPADateTimeService,
    ) {
        this.route.params.subscribe({
            next:((params:any) => {
                this.adminId = params.id;
                this.returnTarget = params.returnTarget
            })
        });

        this.buildEditForm();
    }

    ngOnInit(): void {
        this.getDetail();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
    }

    getDetail() {
        this.spinnerService.loading.next(true);

        this.adminService.getById(`?id=${this.adminId}`).subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);

                this.adminDetail = {
                    ...res.data,
                    createdAt: res.data.createdAt && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(res.data.createdAt), 'dd MMM yyyy'),
                    loginDate: res.data.loginDate && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(res.data.loginDate), 'dd MMM yyyy'),
                    updatedAt: res.data.updatedAt && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(res.data.updatedAt), 'dd MMM yyyy'),
                    deletedAt: res.data.deletedAt && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(res.data.deletedAt), 'dd MMM yyyy'),
                };

                this.toid1 = setTimeout(() => {
                    this.profilePreview = this.adminDetail?.profile;
    
                    this.editForm.patchValue({
                        loginName: this.adminDetail.loginName,
                        phoneNumber: this.adminDetail.phoneNumber,
                        email: this.adminDetail.email,
    
                        lastLoginDate:this.adminDetail.loginDate,
                        registeredDate:this.adminDetail.createdAt,
                        userName:this.adminDetail.userName,
                    });
    
                }, 100);
            }),
            error: (err => {
                this.spinnerService.loading.next(false);
                this.dialogService.showError(err);
            })
        });
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
                    this.profilePreview = undefined;
                    this.profilePreview = this.domSanitizer.bypassSecurityTrustResourceUrl(e.target.result);
                };
                
                reader.readAsDataURL(selectedFiles[i]);
            }
        }
    }

    buildEditForm() {
        this.editForm = this.fb.group({
            loginName:['', Validators.required],
            phoneNumber:['', Validators.required],
            email:['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            
            lastLoginDate:[''],
            registeredDate:[''],
            password:['**********'],
            userName:[''],
        });
    }

    onUpdte(formVal:any) {
        if(this.editForm.valid && this.profilePreview) {

            this.spinnerService.loading.next(true);

            const pl = new FormData();
            pl.append('id', this.adminDetail.id);
            pl.append('loginName', formVal.loginName);
            pl.append('phoneNumber', formVal.phoneNumber);
            pl.append('profile', this.profileImgFile || this.adminDetail.profile);
            pl.append('email', formVal.email);

            this.adminService.updateUser(pl).subscribe({
                next:((res:any) => {
                    this.spinnerService.loading.next(false);
                    
                    this.goToList();

                    this.toastService.showToast({
                        icon:'../../../../../assets/images/general/check-bg-green.svg',
                        title:'Updated Account',
                        description:'you have been successfully updated admin account.'
                    });
                }),
                error: (err => {
                    this.spinnerService.loading.next(false);

                    this.dialogService.showError(err);
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

    goToList() {
        this.returnTarget==='-' && this.router.navigate([`${RouteNames.DASHBOARD}/${RouteNames.ADMIN_MANAGEMENT}`]);
        this.returnTarget==='profile-detail' && this.router.navigate([`${RouteNames.DASHBOARD}/${RouteNames.PROFILE_UPDATE}`]);
    }

    onCancelUpdte() {
        this.goToList();
    }
}