import { Component, Input, Output, OnInit, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { debounceTime } from "rxjs";

import { MenuLabels } from "src/app/core/helpers/menu-label.helper";
import { GlobalSearchSubjectService } from "src/app/core/utils";

@Component({
    selector:'users-table',
    templateUrl:'./users-table.component.html',
    styleUrls:['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, OnChanges {
    @Input() tableData: any;
    @Input() p: any;
    @Input() perPage: any;
    @Input() totalRecords: any;

    @Input() targetService: any;
    @Input() exportQuery: any;
    @Input() exportFileName: any;
    
    @Output() onChangeDropdownValue = new EventEmitter();
    @Output() onGlobalSearch = new EventEmitter();
    @Output() onDetail = new EventEmitter();
    @Output() ongetAll = new EventEmitter();

    title:any;
    filters:any;
    users:any;

    thereIsNoText='There is No data...';

    notSameStatusFields = [MenuLabels.REQUEST_CHEF_USERS, MenuLabels.BLOCK_LIST_USERS];

    constructor(private globalSearchService:GlobalSearchSubjectService) {
        this.globalSearchService.search.pipe(
            debounceTime(1000)
        ).subscribe(search => {
            this.onGlobalSearch.emit(search);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { users } = this.tableData;
        this.users = [...users];
    }

    ngOnInit(): void {
        const { title, filters, users } = this.tableData;

        this.title = title;
        this.filters = [...filters];
        this.users = [...users];

        this.thereIsNoText = `There is No ${title}...`;
    }

    onChangeDropdown(evt:any, filterName$:string) {
        this.onChangeDropdownValue.emit({event: evt, filterName: filterName$});
    }

    gotoDetail(user:any) {
        this.onDetail.emit(user);
    }

    onGetAllData() {
        this.ongetAll.emit(this.p);
    }
}