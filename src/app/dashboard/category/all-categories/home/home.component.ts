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

import { CategoryService } from "src/app/core/services";

@Component({
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.scss']
})
export class CategoriesHomeComponent implements OnInit, OnDestroy {
    categories:any;

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
    }

    getAll() {
        this.spinnerService.loading.next(true);

        let qry = `?page=${this.p}&limit=${this.perPage}&search=${this.searchTxt||''}`;

        this.expQuery$ = `?search=${this.searchTxt||''}`;

        this.categoryService.getAllWithPagin(qry).subscribe({
            next:((res:any) => {
                this.totalRecords = res.pagination?.totalCount;

                if(res.data){
                    this.categories = res.data.map((x:any) => ({
                        id: x.id,
                        name: x.name,
                        createdAt: x.createdAt && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(x.createdAt), 'dd MMM yyyy'),
                        status: x.status ? 'Active' : 'Inactive',
                        isPublic: x.isPublic,
                        requestStatus: x.requestStatus,
                        photo: x.photo
                    }));
                }

                this.toid3 = setTimeout(() => {
                    this.spinnerService.loading.next(false);
                }, 0);

            }),
            error: (err => {
                this.spinnerService.loading.next(false);
            })
        });
    }

    createCategory(){
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.CATEGORIES}/${RouteNames.ALL_CATEGORIES}/${RouteNames.ALL_CATE_CREATE}`]);
    }

    changeIsPublic(evt:any, category:any) {
        this.spinnerService.loading.next(true);

        this.categoryService.updatePublicStatus({ isPublic:evt.target.checked, id: category.id }).subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);
                if(res.success) {
                    this.toastService.showToast({
                        icon:'../../../../../assets/images/general/check-bg-green.svg',
                        title:'Updated Category',
                        description:'you have been successfully updated category as Public.'
                    }, 4500);
                }
            }),
            error:(err => {
                this.spinnerService.loading.next(false);
                this.dialogService.showError(err);
            })
        });
    }

    editCategory(category:any){
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.CATEGORIES}/${RouteNames.ALL_CATEGORIES}/${RouteNames.ALL_CATE_EDIT}`, category.id]);
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
                            
                            this.toid1 = setTimeout(() => {
                                this.toastService.showToast({
                                    icon:'../../../../../assets/images/general/check-bg-red.svg',
                                    title:'Deleted Category',
                                    description:'you have been deleted the category.'
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