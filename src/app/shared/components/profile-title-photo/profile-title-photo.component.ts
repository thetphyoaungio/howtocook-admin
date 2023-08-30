import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector:'profile-title-photo',
    templateUrl:'./profile-title-photo.component.html'
})
export class ProfileTitlePhotoComponent implements OnInit {
    @Input() photo:any;
    @Input() width:any;
    @Input() height:any;

    widthView = '60px';
    heightView = '60px';

    ngOnInit(): void {
        if(this.width) this.widthView = `${this.width}px`;
        if(this.height) this.heightView = `${this.height}px`;
    }
}