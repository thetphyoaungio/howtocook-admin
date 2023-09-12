import { Component, OnDestroy, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";

import { debounceTime } from 'rxjs';

import Dayjs from "dayjs";

import { ReportsService } from "src/app/core/services";

import { 
    SpinnerService, 
    DialogModalService,
    TPADateTimeService, 
    GlobalSearchSubjectService,
} from "src/app/core/utils";
import RouteNames from "src/app/core/helpers/route-names.helper";

@Component({
    templateUrl:'./monthly-yearly-posts.component.html',
    styleUrls:['./monthly-yearly-posts.component.scss']
})
export class DateReportMonthlyYearlyPostsComponent implements OnInit, OnDestroy {
    reports:any;

    selectedDate:any;

    isFirstLoad=true;

    searchTxt:string|any;
    expQuery$:string|any;

    p = 1;
    perPage = 5;
    totalRecords = 0;

    targetPeriod:any;
    fileNameTxt:any;
    thereIsNoTxt:any;

    invoker:any;
    invokerDate:any;

    toid1:any;
    toid2:any;
    toid3:any;
    toid4:any;
    toid5:any;

    constructor(
        public reportService:ReportsService,
        private spinnerService:SpinnerService,
        private dialogService:DialogModalService,
        private dateTimeService:TPADateTimeService,
        private datePipe:DatePipe,
        private globalSearchService:GlobalSearchSubjectService,
        private router:Router,
        private route:ActivatedRoute,
    ) {
        this.route.params.subscribe({
            next:((params:any) => {
                this.targetPeriod = params.target;

                this.invoker = params.invoker;
                this.invokerDate = params.date;
            })
        });

        this.globalSearchService.search.pipe(
            debounceTime(1000)
        ).subscribe((search:any) => {
            this.searchTxt = search;
            this.p = 1;
            this.getReports();
        });

        this.selectedDate = this.invoker && this.invoker!=='-' && this.invokerDate ? 
        this.dateTimeService.createDateForSafariMac_11(this.invokerDate) : new Date();
        
    }

    ngOnInit(): void {
        this.getReports();

        this.fileNameTxt = `date-report-${this.targetPeriod}-posts`;
        this.thereIsNoTxt = `There is No ${this.targetPeriod==='monthly'?'Monthly':'Yearly'} Posts Report...`;
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
        if(this.toid2) clearTimeout(this.toid2);
        if(this.toid3) clearTimeout(this.toid3);
        if(this.toid4) clearTimeout(this.toid4);
        if(this.toid5) clearTimeout(this.toid5);
    }

    getReports() {
        this.spinnerService.loading.next(true);

        let qry = `?page=${this.p}&limit=${this.perPage}&date=${this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')||''}&search=${this.searchTxt||''}`;

        this.expQuery$ = `?date=${this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')||''}&search=${this.searchTxt||''}`;

        const service$ = this.targetPeriod === 'monthly' ? 
        this.reportService.getMonthlyPosts(qry) : 
        this.reportService.getYearlyPosts(qry);

        this.toid3 = setTimeout(() => {
            service$.subscribe({
                next:((res:any) => {
                    
                    this.totalRecords = res.pagination?.totalCount;
    
                    if(res.data) {
                        this.reports = [...(res.data.map((x:any) => ({
                            ...x,
                            day: x.day && (this.targetPeriod === 'monthly' ? 
                            this.datePipe.transform(this.dateTimeService.createDateForSafariMac_3(x.day), 'dd MMM yyyy') : 
                            this.datePipe.transform(this.dateTimeService.createDateForSafariMac_9(x.day), 'MMM yyyy'))
                        })))];
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
        }, 0);
    }

    onDateChangeEvt(evt:any) {
        if(evt) {
            this.selectedDate = this.dateTimeService.createDateForSafariMac_8_datepicker_start((new Date(Dayjs(evt).toString())).toString());

            this.toid1 = setTimeout(() => {
                !this.isFirstLoad && this.getReports();
                this.isFirstLoad && (this.isFirstLoad=false);
            }, 0);

        } else {
            this.selectedDate = null;

            this.dialogService.showWarning('Please select a date!');

            this.toid2 = setTimeout(() => {
                const dpel = <HTMLElement>document.getElementById('datepickerEl');
                if(dpel) dpel.focus();
            }, 5);
        }
    }
    
    goToDateReport() {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.REPORTS}/${RouteNames.DATE_REPORT}`]);
    }

    gotoPostsDetail(date:string) {
        if(this.targetPeriod==='monthly') {
            //daily posts
            this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.REPORTS}/${RouteNames.DATE_REPORT}/${RouteNames.DATE_REPORT_DAILY_POSTS}`,
            'monthly',date]);

        } else if(this.targetPeriod==='yearly') {
            //monthly posts
            this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.REPORTS}/${RouteNames.DATE_REPORT}/${RouteNames.DATE_REPORT_MONTHLY_YEARLY_POSTS}`, 
            'monthly','yearly', date]);
        }

        this.toid5 = setTimeout(() => {
            window.location.reload();
        }, 1);
    }
}