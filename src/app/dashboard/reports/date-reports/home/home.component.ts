import { Component, OnDestroy, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";

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
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.scss']
})
export class DateReportHomeComponent implements OnInit, OnDestroy {
    reports:any;

    selectedDate:any;

    dailyData:string|any = [];
    monthlyData:string|any = [];
    yearlyData:string|any = [];

    isFirstLoad=true;

    dailyTitle = 'Daily Report';
    monthlyTitle = 'Monthly Report';
    yearlyTitle = 'Yearly Report';

    searchTxt:string|any;
    expQuery$:string|any;

    toid1:any;
    toid2:any;

    constructor(
        public reportService:ReportsService,
        private spinnerService:SpinnerService,
        private dialogService:DialogModalService,
        private dateTimeService:TPADateTimeService,
        private datePipe:DatePipe,
        private globalSearchService:GlobalSearchSubjectService,
        private router:Router,
    ) {
        this.globalSearchService.search.pipe(
            debounceTime(1000)
        ).subscribe((search:any) => {
            this.searchTxt = search;
            this.getReports();
        });

        this.selectedDate = new Date();
    }

    ngOnInit(): void {
        this.getReports();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
        if(this.toid2) clearTimeout(this.toid2);
    }

    getReports() {
        this.spinnerService.loading.next(true);

        let qry = `?date=${this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')||''}&search=${this.searchTxt||''}`;

        this.expQuery$ = `?date=${this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')||''}&search=${this.searchTxt||''}`;

        this.reportService.getDateReport(qry).subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);
                
                let daily=[];
                let monthly=[];
                let yearly=[];

                for(let x in res.data) {
                    (x.includes('daily') && !x.includes('Ads')) && daily.push({name:this.setFieldName(x), count:res.data[x]});
                    (x.includes('monthly') && !x.includes('Ads')) && monthly.push({name:this.setFieldName(x), count:res.data[x]});
                    (x.includes('yearly') && !x.includes('Ads')) && yearly.push({name:this.setFieldName(x), count:res.data[x]});
                }

                this.dailyData = {
                    title:this.dailyTitle,
                    data:[...daily],
                }
                this.monthlyData = {
                    title:this.monthlyTitle,
                    data:[...monthly],
                }
                this.yearlyData = {
                    title:this.yearlyTitle,
                    data:[...yearly],
                }

                this.reports = [this.dailyData, this.monthlyData, this.yearlyData];

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

    setFieldName(name:string): string|any {
        if(name.includes('Post')) return 'Total Post Count';
        else if(name.includes('Ads')) return 'Total Ads Count';
        else if(name.includes('NewUser')) return 'Total New User Count';
        
        return '--';
    }
    
    goDetail(item:any, period:string) {
        this.identifyDetailRoute(item, period);
    }

    identifyDetailRoute(item:any, period:string) {
        switch((period.split(' '))[0]) {
            case 'Daily' : {
                if(item.name === 'Total Post Count') {
                    this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.REPORTS}/${RouteNames.DATE_REPORT}/${RouteNames.DATE_REPORT_DAILY_POSTS}`,
                    '-','-']);

                } else if(item.name === 'Total New User Count') {
                    this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.REPORTS}/${RouteNames.DATE_REPORT}/${RouteNames.DATE_REPORT_DAILY_NEW_USERS}`,
                    '-','-']);
                }

                break;
            }

            case 'Monthly' : {
                if(item.name === 'Total Post Count') {
                    this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.REPORTS}/${RouteNames.DATE_REPORT}/${RouteNames.DATE_REPORT_MONTHLY_YEARLY_POSTS}`, 
                    'monthly','-','-']);

                } else if(item.name === 'Total New User Count') {
                    this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.REPORTS}/${RouteNames.DATE_REPORT}/${RouteNames.DATE_REPORT_MONTHLY_YEARLY_NEW_USERS}`, 
                    'monthly','-','-']);
                }

                break;
            }

            case 'Yearly' : {
                if(item.name === 'Total Post Count') {
                    this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.REPORTS}/${RouteNames.DATE_REPORT}/${RouteNames.DATE_REPORT_MONTHLY_YEARLY_POSTS}`, 
                    'yearly','-','-']);

                } else if(item.name === 'Total New User Count') {
                    this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.REPORTS}/${RouteNames.DATE_REPORT}/${RouteNames.DATE_REPORT_MONTHLY_YEARLY_NEW_USERS}`, 
                    'yearly','-','-']);
                }
                
                break;
            }

            default: {break;}
        }
    }
}