import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
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
    templateUrl:'./detail.component.html',
})
export class AdminListDetailComponent implements OnInit, OnDestroy {
    adminId:string|any;
    adminDetail:any;

    toid1:any;
    toid2:any;

    constructor(
        private spinnerService:SpinnerService,
        private dialogService:DialogModalService,
        private toastService:ToastService,
        private adminService:AdminManageService,
        private router:Router,
        private route:ActivatedRoute,
        private dateTimeService:TPADateTimeService,
        private datePipe:DatePipe,
    ) {
        this.route.params.subscribe({
            next:((params:any) => {
                this.adminId = params.id;
            })
        });
    }

    ngOnInit(): void {
        this.getDetail();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
        if(this.toid2) clearTimeout(this.toid2);
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
                }
            }),
            error: (err => {
                this.spinnerService.loading.next(false);
                this.dialogService.showError(err);
            })
        });
    }

    goToList() {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.ADMIN_MANAGEMENT}`]);
    }

    goToEdit() {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.ADMIN_MANAGEMENT}/${RouteNames.ADMIN_LIST}/${RouteNames.ADMIN_EDIT}`, this.adminId,'-']);
    }

    showDeleteDialog() {
        this.dialogService.showConfirm({
            title:'Delete Admin',
            description:'Do you really want to delete this admin? If this admin is deleted, reports related to it will be deleted. This action cannot be undone.',
            okButtonLabel:'Yes, Delete',
        }).subscribe({
            next:(res => {
                console.log('GOT res>>> ', res);
                
                if(res) {
                    this.spinnerService.loading.next(true);

                    const qry = `?id=${this.adminId}`;

                    this.adminService.deleteAdminUser(qry).subscribe({
                        next:((res:any) => {
                            this.spinnerService.loading.next(false);
                            
                            this.toid1 = setTimeout(() => {
                                this.toastService.showToast({
                                    icon:'../../../../../assets/images/general/check-bg-red.svg',
                                    title:'Deleted Admin',
                                    description:'you have been deleted the admin.'
                                });//2500
                            }, 0);

                            this.toid2 = setTimeout(() => {
                                this.goToList();
                            }, 2600);
                        }),
                        error:(err => {
                            this.spinnerService.loading.next(false);

                            this.dialogService.showError(err);
                        })
                    });
                }
            })
        });
    }
}