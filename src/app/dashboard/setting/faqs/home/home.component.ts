import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { debounceTime } from "rxjs";

import { 
    SpinnerService,
    DialogModalService,
    ToastService,
    TPADateTimeService,
    GlobalSearchSubjectService,
} from "src/app/core/utils";

import RouteNames from "src/app/core/helpers/route-names.helper";

import { SettingService } from "src/app/core/services";

@Component({
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.scss']
})
export class SettingFAQsHomeComponent implements OnInit, OnDestroy {
    fAQs:any;

    p = 1;
    perPage = 5;
    totalRecords = 0;

    searchTxt:string|any;
    expQuery$:string|any;

    toid1:any;
    toid2:any;
    toid3:any;

    constructor(
        private router:Router,
        private spinnerService:SpinnerService,
        private dialogService:DialogModalService,
        private toastService:ToastService,
        public settingService:SettingService,
        private datePipe:DatePipe,
        private dateTimeService:TPADateTimeService,
        private globalSearchService:GlobalSearchSubjectService,
    ) {
        this.globalSearchService.search.pipe(
            debounceTime(1000)
        ).subscribe(search => {
            this.searchTxt = search;
            this.p = 1;
            this.getAll();
        });
    }

    ngOnInit(): void {
        this.getAll();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
        if(this.toid2) clearTimeout(this.toid2);
        if(this.toid3) clearTimeout(this.toid3);
    }

    getAll() {
        this.spinnerService.loading.next(true);

        let qry = `?page=${this.p}&limit=${this.perPage}&search=${this.searchTxt||''}`;

        this.expQuery$ = `?search=${this.searchTxt||''}`;

        this.settingService.getAllWithPagin_Faqs(qry).subscribe({
            next:((res:any) => {
                this.totalRecords = res.pagination?.totalCount;

                if(res.data){
                    this.fAQs = res.data.map((x:any) => ({
                        id: x.id,
                        title: x.title,
                        description: x.description,
                        user: {
                            id: x.user?.id,
                            userName: x.user?.userName,
                            loginName: x.user?.loginName
                        },
                        createdAt: x.createdAt && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(x.createdAt), 'dd MMM yyyy'),
                    }));
                }

                this.toid3 = setTimeout(() => {
                    this.spinnerService.loading.next(false);
                }, 0);

            }),
            error: (err => {
                this.spinnerService.loading.next(false);
                this.dialogService.showError(err);
            })
        });
    }

    createItem(){
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.SETTING}/${RouteNames.SETTING_FAQS_LIST}/${RouteNames.SETTING_FAQS_CREATE}`]);
    }

    editItem(id:string){
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.SETTING}/${RouteNames.SETTING_FAQS_LIST}/${RouteNames.SETTING_FAQS_EDIT}`, id]);
    }

    deleteItem(id:string){
        this.dialogService.showConfirm({
            title:'Delete FAQ',
            description:'Do you really want to delete this FAQ? This action cannot be undone.',
            okButtonLabel:'Yes, Delete',
        }).subscribe({
            next:(res => {
                if(res) {
                    this.spinnerService.loading.next(true);

                    this.settingService.delete_Faqs(`?id=${id}`).subscribe({
                        next:((res:any) => {
                            this.spinnerService.loading.next(false);
                            
                            this.toid1 = setTimeout(() => {
                                this.toastService.showToast({
                                    icon:'../../../../../assets/images/general/check-bg-red.svg',
                                    title:'Deleted FAQ',
                                    description:'you have been deleted the FAQ.'
                                });//2500
                            }, 0);

                            this.p = 1;

                            this.toid2 = setTimeout(() => {
                                this.getAll();
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
}