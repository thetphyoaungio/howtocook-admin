import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { debounceTime } from "rxjs";

import { 
    SpinnerService,
    DialogModalService, 
    TPADateTimeService,
    GlobalSearchSubjectService,
} from "src/app/core/utils";

import { UserService } from "src/app/core/services";

import RouteNames from "src/app/core/helpers/route-names.helper";
import { MenuLabels } from "src/app/core/helpers/menu-label.helper";

@Component({
    templateUrl:'./home.component.html'
})
export class BlockListUsersHomeComponent implements OnInit, OnDestroy {
    blockedUsers:Array<any>|any;
    
    statusSelect: any = [];

    p: number = 1;
    perPage: number = 5;
    totalRecords=0;

    selectedStatus:number|any;
    
    tableData:any;
    statusFilterName = 'status';

    filters = [
        {
            name:this.statusFilterName,
            config:{
                displayKey: "label",
                search: true,
                limitTo: 0,
                height: "250px",
                enableSelectAll: true,
                placeholder:'Status'
            },
            options:[
                {
                    label:'Blocked',
                    value: 1,
                },
                {
                    label:'No Block',
                    value: 0,
                },
            ]
        },
    ];

    searchTxt:string|any;
    expQuery$:string|any;

    toid1:any;
    toid2:any;

    constructor(
        private spinnerService:SpinnerService,
        public userService:UserService,
        private router:Router,
        private dialogService:DialogModalService,
        private datePipe:DatePipe,
        private dateTimeService:TPADateTimeService,
        private globalSearchService:GlobalSearchSubjectService,
    ){
        this.globalSearchService.search.pipe(
            debounceTime(1000)
        ).subscribe(search => {
            this.searchTxt = search;
            this.p = 1;
            this.getAllUsers();
        });

        this.selectedStatus = -1;
    }

    ngOnInit(): void {
        this.getAllUsers();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
        if(this.toid2) clearTimeout(this.toid2);
    }

    getAllUsers() {
        this.spinnerService.loading.next(true);

        let qry = `?page=${this.p}&limit=${this.perPage}&search=${this.searchTxt||''}`;
        
        this.expQuery$ = `?search=${this.searchTxt||''}`;
        
        this.userService.getBlockedListUsers(qry).subscribe({
            next:((res:any) => {
                this.totalRecords = res.pagination?.totalCount;

                this.blockedUsers = [...(res.data.map((x:any) => {
                    return {
                        id: x.id,
                        createdAt: x.createdAt && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(x.createdAt), 'dd MMM yyyy'),
                        email: x.email,
                        name: x.name,
                        photo: x.photo,
                        status: x.status ? 'Active':'Inactive',
                        isBlock: x.isBlock ? 'Blocked' : 'No Block',
                        userLevel: x.userLevelData ? x.userLevelData.userLevel : ''
                    }
                }))];

                this.toid2 = setTimeout(() => {
                    this.spinnerService.loading.next(false);
                }, 0);

                this.toid1 = setTimeout(() => {
                    this.tableData = {
                        title: MenuLabels.BLOCK_LIST_USERS,
                        filters: [...this.filters],
                        users:[...this.blockedUsers]
                    }
                }, 1);
            }),
            error:(err => {
                this.spinnerService.loading.next(false);

                this.dialogService.showError(err);
            })
        });
    }

    gotoDetail(user:any) {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.USERS}/${RouteNames.BLOCK_LIST_USERS}/${RouteNames.BLOCK_LIST_USERS_USER_DETAIL}`, user.id]);
    }

    dropDownSelectValueChange() {
        this.p=1;

        this.getAllUsers();
    }
    
    onChangeDropdownFilterValue(evt:any) {
        const { event, filterName } = evt;

        (filterName === this.statusFilterName) && (this.selectedStatus = event.value.hasOwnProperty('value') ? event.value.value : -1);

        this.dropDownSelectValueChange();
    }

    onGlobalSearchData(evt:any) {
        this.searchTxt = evt;
        this.p = 1;
            
        this.getAllUsers();
    }

    onPaginChange(evt:any) {
        this.p = +evt;

        this.getAllUsers();
    }
}