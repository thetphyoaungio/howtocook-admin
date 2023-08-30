import { Component, OnInit, OnDestroy } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { debounceTime } from "rxjs";

import { 
    SpinnerService,
    TPADateTimeService, 
    DialogModalService,
    ToastService,
    GlobalSearchSubjectService,
} from "src/app/core/utils";

import { AdminManageService } from "src/app/core/services";

import RouteNames from "src/app/core/helpers/route-names.helper";

@Component({
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.scss']
})
export class AdminListHomeComponent implements OnInit, OnDestroy {
    alladmins:Array<any>|any;

    p: number = 1;
    perPage: number = 5;
    totalRecords = 0;

    searchTxt:string|any;
    expQuery$:string|any;

    toid1:any;
    toid2:any;
    toid3:any;

    constructor(
        private spinnerService:SpinnerService,
        public adminService:AdminManageService,
        private datePipe:DatePipe,
        private tpaDateTimeService:TPADateTimeService,
        private router:Router,
        private dialogService:DialogModalService,
        private toastService:ToastService,
        private globalSearchService:GlobalSearchSubjectService,
    ) {
        this.globalSearchService.search.pipe(
            debounceTime(1000)
        ).subscribe(search => {
            this.searchTxt = search;
            this.p = 1;
            this.getAdminUsers();
        });
    }

    ngOnInit(): void {
        this.getAdminUsers();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
        if(this.toid2) clearTimeout(this.toid2);
        if(this.toid3) clearTimeout(this.toid3);
    } 

    getAdminUsers() {
        this.spinnerService.loading.next(true);

        let qry = `?page=${this.p}&limit=${this.perPage}&search=${this.searchTxt||''}`;

        this.expQuery$ = `?search=${this.searchTxt||''}`;

        this.adminService.getAllAdmins(qry).subscribe({
            next: ((res:any) => {
                this.totalRecords = res.pagination?.totalCount;

                if(res.data) {
                    this.alladmins = [...(res.data.map((x:any) => ({
                        ...x,
                        createdAt: x.createdAt && this.datePipe.transform(this.tpaDateTimeService.createDateForSafariMac_5(x.createdAt), 'dd MMM yyyy'),
                        loginDate: x.loginDate && this.datePipe.transform(this.tpaDateTimeService.createDateForSafariMac_5(x.loginDate), 'dd MMM yyyy'),
                        updatedAt: x.updatedAt && this.datePipe.transform(this.tpaDateTimeService.createDateForSafariMac_5(x.updatedAt), 'dd MMM yyyy'),
                        deletedAt: x.deletedAt && this.datePipe.transform(this.tpaDateTimeService.createDateForSafariMac_5(x.deletedAt), 'dd MMM yyyy'),
                    })))];
                }

                this.toid1 = setTimeout(() => {
                    this.spinnerService.loading.next(false);
                }, 0);
            }),
            error: (err => {
                this.spinnerService.loading.next(false);

                this.dialogService.showError(err);
            })
        });
    }

    createAdmin() {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.ADMIN_MANAGEMENT}/${RouteNames.ADMIN_LIST}/${RouteNames.ADMIN_CREATE}`]);
    }

    editAdmin(admin:any) {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.ADMIN_MANAGEMENT}/${RouteNames.ADMIN_LIST}/${RouteNames.ADMIN_EDIT}`, admin.id,'']);
    }

    deleteAdmin(admin:any) {
        this.dialogService.showConfirm({
            title:'Delete Admin',
            description:'Do you really want to delete this admin? If this admin is deleted, reports related to it will be deleted. This action cannot be undone.',
            okButtonLabel:'Yes, Delete',
        }).subscribe({
            next:(res => {
                if(res) {
                    this.spinnerService.loading.next(true);

                    this.adminService.deleteAdminUser(`?id=${admin.id}`).subscribe({
                        next:((res:any) => {
                            this.spinnerService.loading.next(false);
                            
                            this.toid2 = setTimeout(() => {
                                this.toastService.showToast({
                                    icon:'../../../../../assets/images/general/check-bg-red.svg',
                                    title:'Deleted Admin',
                                    description:'you have been deleted the admin.'
                                });//2500
                            }, 0);

                            this.toid3 = setTimeout(() => {
                                this.p = 1;
                                this.getAdminUsers();
                            }, 3000);
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

    gotoDetail(admin:any) {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.ADMIN_MANAGEMENT}/${RouteNames.ADMIN_LIST}/${RouteNames.ADMIN_DETAIL}`, admin.id]);
    }
}