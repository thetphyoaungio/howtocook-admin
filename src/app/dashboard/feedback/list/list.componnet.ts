import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { DatePipe } from "@angular/common";
import { debounceTime } from "rxjs";

import { 
    SpinnerService,
    DialogModalService, 
    GlobalSearchSubjectService,
    TPADateTimeService,
} from "src/app/core/utils";

import { FeedBackService } from "src/app/core/services";

@Component({
    templateUrl:'./list.component.html',
    styleUrls:['./list.component.scss']
})
export class FeedBackListComponent implements OnInit, OnDestroy {
    feedbacks:any;

    p = 1;
    perPage = 10;
    totalRecords = 0;

    searchTxt:string|any;
    expQuery$:string|any;

    detailFB:any;
    deviceInnerWidth=0;
    detailDialog:any;

    toid1:any;
    toid2:any;

    constructor(
        private spinnerService:SpinnerService,
        private dialogService:DialogModalService,
        public feedbackService:FeedBackService,
        private globalSearchService:GlobalSearchSubjectService,
        private datePipe:DatePipe,
        private dateTimeService:TPADateTimeService,
    ) {
        this.deviceInnerWidth = window.innerWidth;

        this.globalSearchService.search.pipe(
            debounceTime(1000)
        ).subscribe(search => {
            this.searchTxt = search;
            this.p = 1;
            this.getAll();
        });
    }

    @HostListener('window:resize',['$event'])
    onWindowResize(){
        this.deviceInnerWidth = window.innerWidth;
    }

    ngOnInit(): void {
        this.getAll();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
        if(this.toid2) clearTimeout(this.toid2);
    }

    getAll() {
        this.spinnerService.loading.next(true);

        let qry = `?page=${this.p}&limit=${this.perPage}&search=${this.searchTxt||''}`;

        this.expQuery$ = `?search=${this.searchTxt||''}`;

        this.feedbackService.getAllWithPagin(qry).subscribe({
            next:((res:any) => {
                this.totalRecords = res.pagination?.totalCount;

                if(res.data) {
                    this.feedbacks = res.data.map((x:any) => ({
                        ...x,
                        createdAt: x.createdAt && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(x.createdAt), 'dd MMM yyyy'),
                    }));
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

    showDetail(feekbackId:string) {
        this.spinnerService.loading.next(true);

        this.feedbackService.getDetailById(`?id=${feekbackId}`).subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);

                if(res.data) {
                    this.detailFB = {
                        ...res.data,
                        createdAt: res.data.createdAt && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(res.data.createdAt), 'dd MMM yyyy'),
                        createdTimeOnly: (res.data.createdAt && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(res.data.createdAt), 'HH:mm:ss')) || '-',
                    };

                    this.toid2 = setTimeout(() => {
                        this.detailDialog = <HTMLElement>document.getElementById('detailDialog');
                        if(this.detailDialog) {
                            this.detailDialog.style.display = 'block';
                        }
                    }, 0);
                }
            }),
            error:(err => {
                this.spinnerService.loading.next(false);
                this.dialogService.showError(err);
            })
        });
    }

    closeDetailDialog() {
        if(this.detailDialog) {
            this.detailDialog.style.display = 'none';
        }
    }
}