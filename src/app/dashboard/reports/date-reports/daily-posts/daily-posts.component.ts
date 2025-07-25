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
    templateUrl:'./daily-posts.component.html',
    styleUrls:['./daily-posts.component.scss']
})
export class DateReportDailyPostsComponent implements OnInit, OnDestroy {
    reports:any;

    selectedDate:any;

    isFirstLoad=true;

    searchTxt:string|any;
    expQuery$:string|any;

    p = 1;
    perPage = 5;
    totalRecords = 0;

    invoker:any;
    invokerDate:any;

    toid1:any;
    toid2:any;
    toid3:any;

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
        this.dateTimeService.createDateForSafariMac_10(this.invokerDate) : new Date();
    }

    ngOnInit(): void {
        this.getReports();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
        if(this.toid2) clearTimeout(this.toid2);
        if(this.toid3) clearTimeout(this.toid3);
    }

    getReports() {
        this.spinnerService.loading.next(true);

        let qry = `?page=${this.p}&limit=${this.perPage}&date=${this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')||''}&search=${this.searchTxt||''}`;

        this.expQuery$ = `?date=${this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')||''}&search=${this.searchTxt||''}`;

        this.reportService.getDailyPosts(qry).subscribe({
            next:((res:any) => {
                
                this.totalRecords = res.pagination?.totalCount;

                if(res.data) {
                    this.reports = [...(res.data.map((x:any) => ({
                        id: x.id,
                        account: {id: x.user?.id, name: x.user?.name||'-', email: x.user?.email||'-', photo: x.user?.photo},
                        title: x.title,
                    })))];
                }

                this.toid3 = setTimeout(() => {
                    this.spinnerService.loading.next(false);
                }, 0);
            }),
            error:(err => {
                this.spinnerService.loading.next(false);
                this.dialogService.showError(err);
            })
        });
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

    gotoPostDetail(postId:string) {
        this.router.navigate([
            `/${RouteNames.DASHBOARD}/${RouteNames.USERS}/${RouteNames.ALL_USERS}/${RouteNames.ALL_USERS_POST_DETAIL}`, 
            postId, 
            'date-report-daily-posts'
        ]);
    }
    
    goToDateReport() {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.REPORTS}/${RouteNames.DATE_REPORT}`]);
    }
}