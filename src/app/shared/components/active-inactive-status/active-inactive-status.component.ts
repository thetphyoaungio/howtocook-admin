import { Component, Input } from "@angular/core";

@Component({
    selector:'active-inactive-status',
    templateUrl:'./active-inactive-status.component.html'
})
export class ActiveInactiveStatusComponent {
    @Input() status:any
}