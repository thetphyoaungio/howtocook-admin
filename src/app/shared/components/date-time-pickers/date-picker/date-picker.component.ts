import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import Dayjs from 'dayjs';
import { DaterangepickerDirective } from "ngx-daterangepicker-material";

@Component({
    selector:'htc-date-picker',
    templateUrl:'./date-picker.component.html',
})
export class HTCDatePickerComponent implements OnInit, AfterViewInit {
    @Input() customDate:any;

    @Output() onDateChange = new EventEmitter<any>();

    @ViewChild(DaterangepickerDirective, { static: false }) pickerDirective: DaterangepickerDirective|any;

    selected:any;

    curremit:any;

    constructor() {}

    ngOnInit(): void {
        if(this.customDate) {
            this.selected = {
                start: Dayjs(new Date(this.customDate)),
                end: Dayjs(new Date(this.customDate))
            }
        } else {
            this.selected = {
                start: Dayjs(new Date()),
                end: Dayjs(new Date())
            };
        }
    }

    ngAfterViewInit(): void {
        this.calHeightsOfCalendarImgs();
    }

    datePickerChange(evt:any) {
        if(evt.hasOwnProperty('start')) {
            if(!evt.start) {
                if(this.selected && this.selected.start) {
                    this.preventTwiceAndEmit();
                    
                } else {
                    this.onDateChange.emit(null);
                }
            } else {
                this.preventTwiceAndEmit();
            }
        } else {
            this.onDateChange.emit(null);
        }
    }

    preventTwiceAndEmit() {
        if(this.curremit?.start!==this.selected.start) {
            this.onDateChange.emit(this.selected.start);
            this.curremit = {...this.selected};
        }
    }

    openDatepicker() {
        this.pickerDirective.open();
    }

    calHeightsOfCalendarImgs() {
        const dpcEl = <HTMLElement>document.querySelector('#datepicker-calenderEl');
        const dpEl = <HTMLElement>document.querySelector('#datepickerEl');
        if(dpcEl && dpEl) {
            dpcEl.style.height = `${dpEl.offsetHeight}px`;
        }
    }

    onKeyPress(evt:any) {
        if(evt.keyCode===13) {
            this.pickerDirective.hide();
        }
    }
}