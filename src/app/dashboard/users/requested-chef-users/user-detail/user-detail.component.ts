import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";

import { 
    SpinnerService,
    DialogModalService,
    TPADateTimeService, 
    ToastService,
} from "src/app/core/utils";

import { UserService } from "src/app/core/services";

import RouteNames from "src/app/core/helpers/route-names.helper";

@Component({
    templateUrl:'./user-detail.component.html',
    styleUrls:['./user-detail.component.scss']
})
export class RequestChefUsersUserDetailComponent implements OnInit, OnDestroy {
    userId:any;
    userDetail:any;

    deviceInnerWidth=0;

    toid1:any;
    toid2:any;

    constructor(
        private spinnerService:SpinnerService,
        private userService:UserService,
        private router:Router,
        private route:ActivatedRoute,
        private datePipe:DatePipe,
        private dialogService:DialogModalService,
        private dateTimeService:TPADateTimeService,
        private toastService:ToastService,
    ){
        this.route.params.subscribe({
            next:((params:any) => this.userId = params.id)
        });

        this.deviceInnerWidth = window.innerWidth;
    }

    @HostListener('window:resize',['$event'])
    onWindowResize(){
        this.deviceInnerWidth = window.innerWidth;
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

        this.userService.getById(`?id=${this.userId}`).subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);

                if(res.user) {
                    this.userDetail = {
                        id: res.user.id,
                        createdAt: res.user.createdAt && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(res.user.createdAt), 'dd MMM yyyy'),
                        requestedAt: res.user.requestedAt && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(res.user.requestedAt), 'dd MMM yyyy, HH:mm'),
                        email: res.user.email,
                        name: res.user.name,
                        photo: res.user.photo,
                        status: res.user.status ? 'Active' : 'Inactive',
                        requestedStatus: res.user.requestedAt ? 'Requested' : 'Accepted',
                        userLevel: res.user.userLevelId === "1" ? 'Chef User' : 'Normal User',
                        postCount: res.user.postCount,
                        followerCount: res.user.followerCount,
                    }
                }
            }),
            error:(err => {
                this.spinnerService.loading.next(false);

                this.dialogService.showError(err);
            })
        });
    }

    goToList() {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.USERS}/${RouteNames.REQUEST_CHEF_USERS}`]);
    }

    onApprove() {
        this.dialogService.showConfirm({
            title:'Chef User Level Accept',
            description:'Do you really want to accept this chef user? This action cannot be undone.',
            okButtonLabel:'Ok, Accept',
        }).subscribe({
            next:(res => {
                if(res) {
                    this.spinnerService.loading.next(true);

                    this.userService.acceptChefUserRequest({ id:this.userId }).subscribe({
                        next:((res:any) => {
                            this.spinnerService.loading.next(false);

                            if(res.success) {
                                this.toid1 = setTimeout(() => {
                                    this.toastService.showToast({
                                        icon:'../../../../../assets/images/general/check-bg-green.svg',
                                        title:'Accepted Request User Level',
                                        description:'you have been accepted the user to chef level.'
                                    });//2500
                                }, 0);
    
                                this.toid2 = setTimeout(() => {
                                    this.goToList();
                                }, 3000);
                            }
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

    onOK() {
        this.goToList();
    }
}