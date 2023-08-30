import { Component, Input, OnInit, OnChanges, AfterViewInit, ViewChild, Output, EventEmitter } from "@angular/core";
import { TPADateTimeService } from "src/app/core/utils";

@Component({
    selector:'htc-month-year-picker',
    templateUrl:'./month-year-picker.component.html',
})
export class HTCMonthYearPickerComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() period:any;
    @Output() onValueChange = new EventEmitter();

    @ViewChild('pickerElRef', { static: false }) picker: any;

    selected:any;

    config:any;

    placeholderTxt:any;

    curremit:any;
    userKeyPressEnter=false;

    toid1:any;

    constructor(private datetimeService:TPADateTimeService) {
        //this.selected = new Date();
    }

    ngOnInit() {
        //this.initMonthYear();
    }

    ngOnChanges() {
        this.initMonthYear();
    }

    ngAfterViewInit(): void {
        
    }

    initMonthYear() {
        this.selected = new Date();
        this.config = undefined;

        if(this.period) {
            this.period==='monthly' && (this.config = {dateInputFormat: 'MMMM YYYY'});
            this.period==='yearly' && (this.config = {dateInputFormat: 'YYYY'});

            this.placeholderTxt = this.period==='monthly' ? 'Select Month' : 'Select Year';
        } else {
            this.period='monthly';
            this.config = {dateInputFormat: 'MMMM YYYY'};
            this.placeholderTxt = 'Select Month';
        }
    }

    onOpenCalendar(container:any) {
        if(this.period==='monthly') {
            container.monthSelectHandler = (event: any): void => {
                container._store.dispatch(container._actions.select(event.date));
            };
            container.setViewMode('month');
        } else {
            container.yearSelectHandler = (event: any): void => {
                container._store.dispatch(container._actions.select(event.date));
            };
            container.setViewMode('year');
        }
    }

    onChange(evt:any) {
        //console.log('onChange/ evt>> ', evt);
        //console.log('onChange/ this.selected>> ', this.selected);

        if(this.userKeyPressEnter) {
            if(!evt) {
                this.onValueChange.emit(null);
            }
        } else {
            if(this.curremit!==this.selected) {
                this.onValueChange.emit(this.selected);
    
                this.curremit = this.selected;
            }
        }

        this.toid1 = setTimeout(() => {
            this.userKeyPressEnter = false;
        }, 0);
    }

    openMonthYearpicker() {
        this.picker.nativeElement.click();
    }

    onKeyPress(evt:any) {
        if(evt.keyCode===13) {
            this.userKeyPressEnter = true;
        }
    }
}