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
export class NormalUsersHomeComponent implements OnInit, OnDestroy {
    allusers:Array<any>|any;

    p: number = 1;
    perPage: number = 5;
    totalRecords=0;

    //selectedUserLevel:number|any;
    selectedStatus:number|any;
    
    tableData:any;
    userLevelFilterName = 'user-level';
    statusFilterName = 'status';

    filters = [
        /* {
            name:this.userLevelFilterName,
            config:{
                displayKey: "label",
                search: true,
                limitTo: 0,
                height: "250px",
                enableSelectAll: true,
                placeholder:'User Level'
            },
            options:[
                {
                    label:'Chef User',
                    value: 1,
                },
                {
                    label:'Normal User',
                    value: 2,
                },
            ]
        }, */
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
                    label:'Active',
                    value: 1,
                },
                {
                    label:'Inactive',
                    value: 0,
                },
            ]
        },
    ];
    
    searchTxt:string|any;
    expQuery$:string|any;

    toid1:any;

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

        //this.selectedUserLevel = 2;
        this.selectedStatus = -1;
    }

    ngOnInit(): void {
        this.getAllUsers();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
    }

    getAllUsers() {
        this.spinnerService.loading.next(true);

        let qry = `?userLevelId=2&status=${this.selectedStatus||''}&page=${this.p}&limit=${this.perPage}&search=${this.searchTxt||''}`;

        this.expQuery$ = `?userLevelId=2&status=${this.selectedStatus||''}&search=${this.searchTxt||''}`;

        this.userService.getAllUsers(qry).subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);

                this.totalRecords = res.pagination?.totalCount;

                this.allusers = [...(res.data.map((x:any) => {
                    return {
                        id: x.id,
                        createdAt: x.createdAt && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(x.createdAt), 'dd MMM yyyy'),
                        email: x.email,
                        name: x.name,
                        photo: x.photo,
                        status: x.status ? 'Active':'Inactive',
                        userLevel: x.userLevelData ? x.userLevelData.userLevel : ''
                    }
                }))];

                this.toid1 = setTimeout(() => {
                    this.tableData = {
                        title: MenuLabels.NORMAL_USERS,
                        filters: [...this.filters],
                        users:[...this.allusers]
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
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.USERS}/${RouteNames.NORMAL_USERS}/${RouteNames.NORMAL_USERS_USER_DETAIL}`, user.id]);
    }

    dropDownSelectValueChange() {
        this.p=1;
        this.perPage=5;

        this.getAllUsers();
    }
    
    onChangeDropdownFilterValue(evt:any) {
        const { event, filterName } = evt;
        console.log('event',event);
        console.log('filterName',filterName);
        console.log('event.value.hasOwnProperty(\'value\')',event.value.hasOwnProperty('value'));
        console.log('event.value.value',event.value.value);
        

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