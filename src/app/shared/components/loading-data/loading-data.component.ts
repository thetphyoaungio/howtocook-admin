import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector:'loading-data',
    templateUrl: './loading-data.component.html'
})
export class LoadingDataComponent implements OnInit {
    @Input() description:string|any;
    @Input() minHeight:string|any;

    ngOnInit(): void {
        if(!this.minHeight) this.minHeight = '227px';
    }
}