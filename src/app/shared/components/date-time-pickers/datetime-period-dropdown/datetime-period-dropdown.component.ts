import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from "@angular/core";

import { RPT_PERIOD_OPTIONS } from "src/app/core/helpers/reports-datetime-period-options.helper";

@Component({
    selector:'htc-datetime-period-dropdown',
    templateUrl:'./datetime-period-dropdown.component.html'
})
export class HTCDateTimePeriodDropDownComponent implements OnInit, OnChanges {
    @Input() singleSelectInput:any;
    @Output() onChangeDateTimePeriod = new EventEmitter<any>();

    config = {
        displayKey: "label",
        search: true,
        limitTo: 0,
        height: "250px",
        placeholder:'Select Period',
        enableSelectAll: true,
    };
    options = [...RPT_PERIOD_OPTIONS];

    singleSelect:any;

    ngOnInit(): void {
        this.initSingleSelect();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.initSingleSelect();
    }

    searchChange(evt:any) {
        this.onChangeDateTimePeriod.emit(this.singleSelect);
    }

    initSingleSelect() {
        this.singleSelect = this.singleSelectInput || null;
    }
}