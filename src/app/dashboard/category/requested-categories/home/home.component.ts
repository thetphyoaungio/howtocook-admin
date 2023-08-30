import { Component, OnInit, OnDestroy } from "@angular/core";
import { DatePipe } from "@angular/common";
import { debounceTime } from "rxjs";

import { 
    SpinnerService,
    DialogModalService,
    ToastService,
    TPADateTimeService,
    GlobalSearchSubjectService,
} from "src/app/core/utils";

import { CategoryService } from "src/app/core/services";

@Component({
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.scss']
})
export class RequestedCategoriesHomeComponent implements OnInit, OnDestroy {
    categories:any;

    p = 1;
    perPage = 5;
    totalRecords = 0;

    searchTxt:string|any;
    expQuery$:string|any;

    toid1:any;
    toid2:any;
    toid3:any;
    toid4:any;
    toid5:any;

    constructor(
        private spinnerService:SpinnerService,
        private dialogService:DialogModalService,
        private toastService:ToastService,
        public categoryService:CategoryService,
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
        if(this.toid4) clearTimeout(this.toid4);
        if(this.toid5) clearTimeout(this.toid5);
    }

    getAll() {
        this.spinnerService.loading.next(true);

        let qry = `?page=${this.p}&limit=${this.perPage}&search=${this.searchTxt||''}`;

        this.expQuery$ = `?search=${this.searchTxt||''}`;

        this.categoryService.getAllRequested(qry).subscribe({
            next:((res:any) => {
                this.totalRecords = res.pagination?.totalCount;

                if(res.data) {
                    this.categories = res.data.map((x:any) => ({
                        id: x.id,
                        name: x.name,
                        createdAt: x.createdAt && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(x.createdAt), 'dd MMM yyyy'),
                        status: x.status ? 'Active' : 'Inactive',
                        isPublic: x.isPublic,
                        requestStatus: x.requestStatus ? 'Requested' : '',
                        photo: x.photo
                    }));
                }

                this.toid1 = setTimeout(() => {
                    this.spinnerService.loading.next(false);
                }, 0);
            }),
            error: (err => {
                this.spinnerService.loading.next(false);
            })
        });
    }

    deleteCategory(category:any){
        this.dialogService.showConfirm({
            title:'Delete Category',
            description:'Do you really want to delete this category? This action cannot be undone.',
            okButtonLabel:'Yes, Delete',
        }).subscribe({
            next:(res => {
                if(res) {
                    this.spinnerService.loading.next(true);

                    this.categoryService.deleteCategory(`?id=${category.id}`).subscribe({
                        next:((res:any) => {
                            this.spinnerService.loading.next(false);
                            
                            this.toid2 = setTimeout(() => {
                                this.toastService.showToast({
                                    icon:'../../../../../assets/images/general/check-bg-red.svg',
                                    title:'Deleted Category',
                                    description:'you have been deleted the category.'
                                });//2500
                            }, 0);

                            this.p = 1;

                            this.toid3 = setTimeout(() => {
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

    onAccept(category:any) {
        this.dialogService.showConfirm({
            title:'Accept Category',
            description:'Do you really want to accept this category? This action cannot be undone.',
            okButtonLabel:'Yes, Accept',
        }).subscribe({
            next:(res => {
                if(res) {
                    this.spinnerService.loading.next(true);

                    let pl = new FormData();
                    pl.append('id', category.id);

                    this.categoryService.acceptRequestedCategory(pl).subscribe({
                        next:((res:any) => {
                            this.spinnerService.loading.next(false);
                            
                            this.toid4 = setTimeout(() => {
                                this.toastService.showToast({
                                    icon:'../../../../../assets/images/general/check-bg-green.svg',
                                    title:'Accepted Category',
                                    description:'you have been accepted this category.'
                                });//2500
                            }, 0);

                            this.p = 1;

                            this.toid5 = setTimeout(() => {
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