import { Component, OnInit, OnDestroy } from "@angular/core";
import { DatePipe } from "@angular/common";
import { debounceTime } from 'rxjs';
import { Router } from "@angular/router";

import { 
    TPADateTimeService, 
    GlobalSearchSubjectService, 
    SpinnerService,
    DialogModalService,
} from "src/app/core/utils";

import { ReportsService } from "src/app/core/services";

import RouteNames from "src/app/core/helpers/route-names.helper";

@Component({
    templateUrl:'./users-report.component.html',
    styleUrls:['./users-report.component.scss']
})
export class UsersReportComponent implements OnInit, OnDestroy {
    ulConfig = {
        displayKey: "label",
        search: true,
        limitTo: 0,
        height: "250px",
        enableSelectAll: true,
        placeholder:'User Level'
    };
    ulOptions = [
        {
            label:'Chef User',
            value: 1,
        },
        {
            label:'Normal User',
            value: 2,
        },
    ];

    statusConfig = {
        displayKey: "label",
        search: true,
        limitTo: 0,
        height: "250px",
        enableSelectAll: true,
        placeholder:'Status'
    };
    statusOptions = [
        {
            label:'Active',
            value: 1,
        },
        {
            label:'Inactive',
            value: 0,
        },
    ];

    reports:any;
    userCountData:any;

    searchTxt:string|any;
    expQuery$:string|any;

    p=1;
    perPage=10;
    totalRecords=0;

    selectedUserLevel = -1;
    selectedStatus = -1;

    userCountDataImgs = [
        '../../../../assets/images/shared/dashboard/info-card/today-ads-income.svg',
        '../../../../assets/images/shared/dashboard/info-card/new-visitors.svg',
        '../../../../assets/images/shared/dashboard/info-card/new-request.svg',
        '../../../../assets/images/shared/dashboard/info-card/pending-request.svg',
    ];

    userCountDataTitles = [
        'Today New Users',
        'Monthly New Users',
        'Yearly Total Users',
        'Total Users',
    ];

    toid1:any
    toid2:any
    toid3:any
    toid4:any

    constructor(
        private datePipe:DatePipe,
        private dateTimeService:TPADateTimeService,
        private globalSearchService:GlobalSearchSubjectService,
        private spinnerService:SpinnerService,
        private dialogService:DialogModalService,
        public reportService:ReportsService,
        private router:Router,
    ) {
        this.globalSearchService.search.pipe(
            debounceTime(1000)
        ).subscribe(search => {
            this.searchTxt = search;
            this.p = 1;
            this.getReport();
        });
    }

    ngOnInit(): void {
        this.getReport();
        this.getUserCountData();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
        if(this.toid2) clearTimeout(this.toid2);
        if(this.toid3) clearTimeout(this.toid3);
        if(this.toid4) clearTimeout(this.toid4);
    }

    getReport() {
        this.spinnerService.loading.next(true);

        let qry = `?page=${this.p}&limit=${this.perPage}&userLevel=${this.selectedUserLevel||''}&status=${this.selectedStatus||''}&search=${this.searchTxt||''}`;

        this.expQuery$ = `?userLevel=${this.selectedUserLevel||''}&status=${this.selectedStatus||''}&search=${this.searchTxt||''}`;

        this.reportService.getUsersReport(qry).subscribe({
            next:((res:any) => {
                this.totalRecords = res.pagination?.totalCount;

                if(res.data) {
                    this.reports = [...res.data.map((x:any) => ({
                        id: x.id,
                        createdAt: x.createdAt && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(x.createdAt), 'dd MMM yyyy'),
                        email: x.email,
                        name: x.name,
                        photo: x.photo,
                        status: x.status ? 'Active':'Inactive',
                        userLevel: x.userLevelData ? x.userLevelData.userLevel : ''
                    }))];
                }
                
                this.toid1 = setTimeout(() => {
                    this.spinnerService.loading.next(false);
                }, 0);
                
            }),
            error:((err:any) => {
                this.spinnerService.loading.next(false);
                this.dialogService.showError(err);
            })
        });
    }

    onChangeUserLevel(evt:any) {
        this.selectedUserLevel = evt.value.hasOwnProperty('value') ? evt.value.value : -1;

        this.toid2 = setTimeout(() => {
            this.getReport();
        }, 0);
    }

    onChangeStatus(evt:any) {
        this.selectedStatus = evt.value.hasOwnProperty('value') ? evt.value.value : -1;

        this.toid3 = setTimeout(() => {
            this.getReport();
        }, 0);
    }

    getUserCountData() {
        this.spinnerService.loading.next(true);

        this.reportService.getUserDataCount().subscribe({
            next:((res:any) => {
                this.userCountData = [];

                let i=0;
                for(let k in res.data) {
                    this.userCountData.push(
                        {
                            image: this.userCountDataImgs[i],
                            title: this.userCountDataTitles[i],
                            count: res.data[k],
                            totalPercent:65,
                            target: 'user-report',
                        }
                    );

                    i+=1;
                }

                this.toid4 = setTimeout(() => {
                    this.spinnerService.loading.next(false);
                }, 0);
            }),
            error:(err => {
                this.spinnerService.loading.next(false);
                this.dialogService.showError(err);
            })
        });
    }

    gotoDetail(userId:string) {
        this.router.navigate([
            `/${RouteNames.DASHBOARD}/${RouteNames.USERS}/${RouteNames.ALL_USERS}/${RouteNames.ALL_USERS_USER_DETAIL}`, 
            userId, 
            'users-report'
        ]);
    }
}