import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector:'htc-image-uploader',
    templateUrl:'./image-uploader.component.html'
})
export class HTCImageUploaderComponent {
    @Input() image:string|any;
    @Input() shape:string|any;
    @Input() type:string|any;

    @Output() onUploaded = new EventEmitter();

    updateImage(event:any) {
        this.onUploaded.emit(event);
    }
}