import { 
    Component, 
    Input, 
    Output, 
    EventEmitter, 
    OnInit, 
    OnDestroy 
} from "@angular/core";
import { DatePipe } from "@angular/common";

import { DialogModalService } from "src/app/core/utils";

@Component({
    selector:'htc-from-to-date-picker',
    templateUrl:'./from-to-date-picker.component.html',
})
export class HTCFromToDatePickerComponent implements OnInit, OnDestroy {
    @Input() startDate:Date|any;
    @Input() endDate:Date|any;

    @Output() onSelectedDates:EventEmitter<any>=new EventEmitter();
    
    start:Date|any;
    end:Date|any;

    selected_start:any;
    selected_end:any;

    toid1:any;

    constructor(
        private datePipe:DatePipe, 
        private dialogService:DialogModalService,
    ){}

    ngOnInit(): void {
        if(this.startDate) this.selected_start.start = new Date(this.startDate);
        
        if(this.endDate) this.selected_end.end = new Date(this.endDate);
    }

    ngOnDestroy(): void {
        if(this.toid1) {clearTimeout(this.toid1)}
    }

    onStartDateChanged(evt:any, ref:HTMLElement) {
        this.selected_start.start = new Date(evt.startDate).toISOString();

        if(this.selected_end.end) {
            //emit start & end values!
            this.onSelectedDates.emit({from: this.selected_start.start, to:new Date(this.selected_end.end).toISOString()});
        } else {
            this.selected_end.end = null;
        }
    }
    onEndDateChanged(evt:any, ref:any) {
        this.selected_end.end = new Date(evt.endDate).toISOString();
        
        if((new Date(this.selected_start.start).toISOString()) === '1970-01-01T00:00:00.000Z') {
            this.showWarning('From');

            this.selected_start.start = null;

        } else {
            //emit start & end values!
            this.onSelectedDates.emit({from: new Date(this.selected_start.start).toISOString(), to:this.selected_end.end});
        }
    }

    openDatepickerStart(ref:any) {
        ref.click();
    }
    openDatepickerEnd(ref:any) {
        ref.click();
    }

    onKeyUp(evt:any, ref:any) {
        //console.log('evt.keyCode>> ',evt.keyCode, evt.target.value.length);
        
        if((evt.keyCode===8 || evt.keyCode===46) && evt.target.value.length === 0) {
            this.checkAndsetValues(ref);

        } else  if(evt.keyCode===13) {
            const maintitleEl = <HTMLElement>document.getElementsByClassName('main-title')[0];
            maintitleEl.click();

            if(evt.target.value.length === 0){
                this.checkAndsetValues(ref);
            }
        }
    }

    showWarning(toSelectDateName:string) {
        this.dialogService.showWarning(`Please select a "${toSelectDateName}" date!`);
    }

    checkAndsetValues(ref:any) {
        if(ref.name === 'startDate') {
            this.showWarning('From');

            this.selected_start.start = null;
        } else {
            this.showWarning('To');

            this.selected_end.end = null;
        }
    }
}