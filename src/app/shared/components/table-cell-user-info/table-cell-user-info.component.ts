import { Component, Input } from "@angular/core";

@Component({
    selector:'table-cell-user-info',
    templateUrl:'./table-cell-user-info.component.html'
})
export class TableCellUserInfoComponent {
    @Input() user:any;
}