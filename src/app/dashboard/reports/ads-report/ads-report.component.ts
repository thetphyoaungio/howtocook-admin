import { Component, OnInit, OnDestroy } from "@angular/core";
import { DatePipe } from "@angular/common";

import { debounceTime } from 'rxjs';

import Dayjs from "dayjs";

import { 
    TPADateTimeService, 
    GlobalSearchSubjectService, 
    SpinnerService,
    DialogModalService,
} from "src/app/core/utils";

import { ReportsService } from "src/app/core/services";
import { RPT_PERIOD_OPTIONS } from "src/app/core/helpers/reports-datetime-period-options.helper";

@Component({
    templateUrl:'./ads-report.component.html',
    styleUrls:['./ads-report.component.scss']
})
export class AdsReportComponent implements OnInit, OnDestroy {
    reports:any;
    
    selectedDateTimePeriod:any;
    selectedDate:any;
    searchTxt:string|any;

    isShowMonthYearPicker = false;
    isShowMonthPicker = false;
    isShowYearPicker = false;
    
    isFirstLoad=true;

    p=1;
    perPage=10;
    totalRecords=0;

    expQuery$:string|any;

    toid1:any;
    toid2:any;
    toid3:any;
    toid4:any;

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
        ).subscribe(search => {
            this.searchTxt = search;
            
            this.getReports();
        });
        
        this.selectedDateTimePeriod = {...RPT_PERIOD_OPTIONS[0]};

        this.selectedDate = new Date();
    }

    ngOnInit(): void {
        this.setVisibleMonthYearFilter(this.selectedDateTimePeriod.value);

        this.getReports();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
        if(this.toid2) clearTimeout(this.toid2);
        if(this.toid3) clearTimeout(this.toid3);
        if(this.toid4) clearTimeout(this.toid4);
    }

    getReports() {
        this.spinnerService.loading.next(true);

        let qry = 
        `?page=${this.p}&limit=${this.perPage}&period=${this.selectedDateTimePeriod.value||''}&date=${this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')||''}&search=${this.searchTxt||''}`;

        this.expQuery$ = 
        `?period=${this.selectedDateTimePeriod.value||''}&date=${this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')||''}&search=${this.searchTxt||''}`;

        this.reportService.getAdsReport(qry).subscribe({
            next:((res:any) => {
                this.totalRecords = res.pagination?.totalCount;

                if(res.data) {
                    this.reports = [...(res.data.map((x:any)=>({
                        id: x.id,
                        name: x.name,
                        type: x.type,
                        createdAt: x.createdAt && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(x.createdAt), 'dd MMM yyyy'),
                        incomeAmt: x.incomeAmt
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
    }

    onDateTimePeriodChange(evt:any) {
        if(evt.hasOwnProperty('value')) {
            
            this.selectedDateTimePeriod = {...evt};

            this.selectedDate = new Date();

            this.setVisibleMonthYearFilter(evt.value);
        };
    } 

    onDateChangeEvt(evt:any) {
        if(evt) {
            this.selectedDate = this.dateTimeService.createDateForSafariMac_8_datepicker_start((new Date(Dayjs(evt).toString())).toString());
        } else {
            this.selectedDate = null;
        }

        this.toid1 = setTimeout(() => {
            !this.isFirstLoad && this.getReports();
            this.isFirstLoad && (this.isFirstLoad=false);
        }, 0);
    }

    onMonthValueChange(evt:any) {
        if(evt) {
            this.selectedDate = this.dateTimeService.createDateForSafariMac_8(evt.toString());
        } else {
            this.selectedDate = null;
        }

        this.toid2 = setTimeout(() => {
            this.getReports();
        }, 0);
    }

    onYearValueChange(evt:any) {
        if(evt) {
            this.selectedDate = this.dateTimeService.createDateForSafariMac_8(evt.toString());
        } else {
            this.selectedDate = null;
        }

        this.toid3 = setTimeout(() => {
            this.getReports();
        }, 0);
    }

    setVisibleMonthYearFilter(value:string) {
        this.isShowMonthYearPicker = value!=='daily';
        this.isShowMonthPicker = value === 'monthly';
        this.isShowYearPicker = value === 'yearly';
    }
}