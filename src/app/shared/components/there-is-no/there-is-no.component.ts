import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector:'there-is-no',
    templateUrl: './there-is-no.component.html'
})
export class ThereIsNoComponent implements OnInit {
    @Input() description:string|any;
    @Input() minHeight:string|any;

    ngOnInit(): void {
        if(!this.minHeight) this.minHeight = '227px';
    }
}