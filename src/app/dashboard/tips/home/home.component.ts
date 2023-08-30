import { Component, OnInit, OnDestroy } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { debounceTime } from 'rxjs';

import { 
    SpinnerService,
    TPADateTimeService, 
    DialogModalService,
    ToastService,
    GlobalSearchSubjectService,
} from "src/app/core/utils";

import { TipService } from "src/app/core/services";

import RouteNames from "src/app/core/helpers/route-names.helper";

@Component({
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.scss']
})
export class TipsHomeComponent implements OnInit, OnDestroy {
    alltips:Array<any>|any;

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
        public tipService:TipService,
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
            this.getTips();
        });
    }

    ngOnInit(): void {
        this.getTips();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
        if(this.toid2) clearTimeout(this.toid2);
        if(this.toid3) clearTimeout(this.toid3);
    } 

    getTips() {
        this.spinnerService.loading.next(true);

        let qry = `?page=${this.p}&limit=${this.perPage}&search=${this.searchTxt||''}`;
        
        this.expQuery$ = `?search=${this.searchTxt||''}`;

        this.tipService.getAllWithPagin(qry).subscribe({
            next: ((res:any) => {
                this.totalRecords = res.pagination?.totalCount;

                if(res.data) {
                    this.alltips = [...(res.data.map((x:any) => ({
                        id: x.id,
                        title: x.title,
                        description: x.description,
                        createdAt: x.createdAt && this.datePipe.transform(this.tpaDateTimeService.createDateForSafariMac_5(x.createdAt), 'dd MMM yyyy, HH:mm'),
                        user:{
                            id: x.user?.id,
                            name: x.user?.userName
                        },
                        isPublic: x.isPublic,
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

    createTip() {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.TIPS}/${RouteNames.TIPS_CREATE}`]);
    }

    editTip(tip:any) {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.TIPS}/${RouteNames.TIPS_EDIT}`, tip.id]);
    }

    deleteTip(tip:any) {
        this.dialogService.showConfirm({
            title:'Delete Tip',
            description:'Do you really want to delete this tip? This action cannot be undone.',
            okButtonLabel:'Yes, Delete',
        }).subscribe({
            next:(res => {
                if(res) {
                    this.spinnerService.loading.next(true);

                    this.tipService.delete(`?id=${tip.id}`).subscribe({
                        next:((res:any) => {
                            this.spinnerService.loading.next(false);
                            
                            this.toid2 = setTimeout(() => {
                                this.toastService.showToast({
                                    icon:'../../../../../assets/images/general/check-bg-red.svg',
                                    title:'Deleted Tip',
                                    description:'you have been deleted the tip.'
                                });//2500
                            }, 0);

                            this.toid3 = setTimeout(() => {
                                this.p = 1;

                                this.getTips();
                            }, 2500);
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

    changeIsPublic(evt:any, category:any) {
        this.spinnerService.loading.next(true);

        const pl = new FormData();
        pl.append('isPublic', evt.target.checked);
        pl.append('id', category.id);

        this.tipService.updatePublicStatus(pl).subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);
                if(res.success) {
                    this.toastService.showToast({
                        icon:'../../../../../assets/images/general/check-bg-green.svg',
                        title:'Updated Tip',
                        description:'you have been successfully updated tip as Public.'
                    }, 4500);
                }
            }),
            error:(err => {
                this.spinnerService.loading.next(false);
                this.dialogService.showError(err);
            })
        });
    }

    gotoDetail(tip:any) {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.TIPS}/${RouteNames.TIPS_DETAIL}`, tip.id]);
    }
}