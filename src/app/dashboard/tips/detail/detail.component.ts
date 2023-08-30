import { Component, OnInit, OnDestroy } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";

import { 
    SpinnerService, 
    DialogModalService, 
    ToastService,
    TPADateTimeService,
} from "src/app/core/utils";

import { TipService } from "src/app/core/services";
import RouteNames from "src/app/core/helpers/route-names.helper";

@Component({
    templateUrl:'./detail.component.html',
    styleUrls:['./detail.component.scss']
})
export class TipDetailComponent implements OnInit, OnDestroy {
    id$:any;
    detailData:any;

    profilePreView:string|any;
    profileImgFile:any;

    toid1:any;
    toid2:any;

    constructor(
        private spinnerService:SpinnerService,
        private tipService:TipService,
        private domSanitizer:DomSanitizer, 
        private dialogService:DialogModalService, 
        private router:Router,
        private toastService:ToastService,
        private route:ActivatedRoute,
        private datePipe:DatePipe,
        private dateTimeService:TPADateTimeService,
    ) {
        this.route.params.subscribe({
            next:((params:any) => this.id$ = params.id)
        });
    }

    ngOnInit(): void {
        this.getDetail();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
        if(this.toid2) clearTimeout(this.toid2);
    }

    getDetail() {
        this.spinnerService.loading.next(true);

        this.tipService.getById(`?id=${this.id$}`).subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);

                this.detailData = {
                    id: res.data.id,
                    title: res.data.title,
                    description: res.data.description,
                    photo: res.data.photo=="undefined" ? null : res.data.photo,
                    createdAt: res.data.createdAt && this.datePipe.transform(
                        this.dateTimeService.createDateForSafariMac_5(res.data.createdAt), 'dd MMM yyyy, hh:mma'),
                    isPublic: res.data.isPublic,
                    steps: [...res.data.steps],
                    user: {
                        id: res.data.user?res.data.user.id : '',
                        name: res.data.user?res.data.user.userName : '-',
                    }
                };

                this.profilePreView = res.data.photo=="undefined" ? null : res.data.photo;
            }),
            error:(err => {
                this.spinnerService.loading.next(false);
                this.dialogService.showError(err);
            })
        });
    }

    changeIsPublic(evt:any) {
        //evt.target.checked
        this.spinnerService.loading.next(true);

        const pl = new FormData();
        pl.append('isPublic', evt.target.checked);
        pl.append('id', this.detailData.id);
        pl.append('photo', this.detailData.photo);
        pl.append('description', this.detailData.description);

        this.tipService.update(pl).subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);
                if(res.success) {
                    this.toastService.showToast({
                        icon:'../../../../../assets/images/general/check-bg-green.svg',
                        title:'Updated Tip',
                        description:'you have been successfully updated tip as Public.'
                    }, 4500);
                }
            }),
            error:(err => {
                this.spinnerService.loading.next(false);
                this.dialogService.showError(err);
            })
        });
    }

    goToList() {this.router.navigate([`${RouteNames.DASHBOARD}/${RouteNames.TIPS}`]);}

    gotoEdit() {this.router.navigate([`${RouteNames.DASHBOARD}/${RouteNames.TIPS}/${RouteNames.TIPS_EDIT}`, this.detailData.id]);}

    onDelete() {
        this.dialogService.showConfirm({
            title:'Delete Tip',
            description:'Do you really want to delete this tip? If this tip is deleted, reports related to it will be deleted. This action cannot be undone.',
            okButtonLabel:'Yes, Delete',
        }).subscribe({
            next:(res => {
                if(res) {
                    this.spinnerService.loading.next(true);

                    const qry = `?id=${this.detailData.id}`;

                    this.tipService.delete(qry).subscribe({
                        next:((res:any) => {
                            this.spinnerService.loading.next(false);
                            
                            this.toid1 = setTimeout(() => {
                                this.toastService.showToast({
                                    icon:'../../../../../assets/images/general/check-bg-red.svg',
                                    title:'Deleted Tip',
                                    description:'you have been deleted the tip.'
                                });//2500
                            }, 0);

                            this.toid2 = setTimeout(() => {
                                this.goToList();
                            }, 2500);
                        }),
                        error:(err => {
                            this.spinnerService.loading.next(false);

                            this.dialogService.showError(err);
                        })
                    });
                }
            })
        });
    }
}