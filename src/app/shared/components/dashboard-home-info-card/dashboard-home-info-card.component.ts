import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector:'dashboard-home-info-card',
    templateUrl:'./dashboard-home-info-card.component.html',
    styleUrls:['./dashboard-home-info-card.component.scss']
})
export class DashboardHomeInfoCardComponent implements OnInit {
    @Input() image:string|any;
    @Input() title:string|any;
    @Input() subTitle:string|any;
    @Input() count:string|any;
    @Input() percent:string|any;
    @Input() isPercentUp:string|any;
    @Input() totalPercent:string|any;
    @Input() styleIdx:number|any;
    @Input() target:string|any;

    percentUpDownImgPath='';

    styles = [
        'today-ads-income-img-bg today-ads-income-img-bg-color',
        'new-visitors-img-bg new-visitors-img-bg-color',
        'new-request-img-bg new-request-img-bg-color',
        'pending-request-img-bg pending-request-img-bg-color',
    ];

    progressBarBgColors = [
        '#18A16F',
        '#EE9F27',
        '#C43704',
        '#A715BF',
    ];

    ngOnInit(): void {
        !this.target && 
        (this.percentUpDownImgPath = `../../../../assets/images/shared/dashboard/info-card/${this.isPercentUp ? 
            'info-up-percent-arrow.svg' : 'info-down-percent-arrow.svg'}`);
    }
}
