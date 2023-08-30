import { Component, OnInit, OnDestroy } from "@angular/core";
import { DatePipe } from "@angular/common";

import { debounceTime } from 'rxjs';

import { 
    TPADateTimeService, 
    GlobalSearchSubjectService, 
    SpinnerService,
    DialogModalService,
} from "src/app/core/utils";

import { ReportsService } from "src/app/core/services";

@Component({
    templateUrl:'./new-users-report.component.html',
    styleUrls:['./new-users-report.component.scss']
})
export class NewUsersReportComponent implements OnInit, OnDestroy {
    reports:any;
    
    searchTxt:string|any;

    p=1;
    perPage=10;
    totalRecords=0;

    expQuery$:string|any;

    startDate:string|any;
    endDate:string|any;

    toid1:any;

    constructor(
        private datePipe:DatePipe,
        private dateTimeService:TPADateTimeService,
        private globalSearchService:GlobalSearchSubjectService,
        private spinnerService:SpinnerService,
        private dialogService:DialogModalService,
        public reportService:ReportsService,
    ) {
        this.globalSearchService.search.pipe(
            debounceTime(1000)
        ).subscribe((search:any) => {
            this.searchTxt = search;
            this.p = 1;
            this.getReports();
        });
    }

    ngOnInit(): void {
        this.getReports();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
    }

    getReports() {
        this.spinnerService.loading.next(true);

        let qry = `?page=${this.p}&limit=${this.perPage}&startDate=${this.startDate||''}&endDate=${this.endDate||''}&search=${this.searchTxt||''}`;

        this.expQuery$ = `?startDate=${this.startDate||''}&endDate=${this.endDate||''}&search=${this.searchTxt||''}`;

        this.reportService.getNewUsersReport(qry).subscribe({
            next:((res:any) => {
                this.totalRecords = res.pagination?.totalCount;

                if(res.data) {
                    this.reports = [...(res.data.map((x:any)=>({
                        id: x.id,
                        name: x.name,
                        email: x.email,
                        photo: x.photo,
                        createdAt: x.createdAt && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(x.createdAt), 'dd MMM yyyy'),
                        userLevel: x.userLevelData?.userLevel || '-',
                        status: x.status ? 'Active' : 'Inactive',
                    })))];
                }
                
                this.toid1 = setTimeout(() => {
                    this.spinnerService.loading.next(false);
                }, 0);
            }),
            error:(err => {
                this.spinnerService.loading.next(false);
                this.dialogService.showError(err);
            })
        });
    }
    
    onSelectedDateRange(evt:any) {
        const { from, to } = evt;

        this.startDate = this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(from), 'yyyy-MM-dd');
        this.endDate = this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(to), 'yyyy-MM-dd');
        
        this.getReports();
    }

    /* setExportQuary(qry:string) {
        if(this.expQuery$.length === 0)  {
            this.expQuery$ = `?${qry}`;
        } else {
            this.expQuery$ += `&${qry}`;
        }
    } */
}