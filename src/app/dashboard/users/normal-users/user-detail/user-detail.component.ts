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
export class NormalUsersUserDetailComponent implements OnInit, OnDestroy {
    userId:any;
    userDetail:any;

    commentActivities:Array<any>|any;

    p: number = 1;
    perPage: number = 4;
    totalCommentActivityCount = 0;

    deviceInnerWidth=0;
    commentActivityDetailDialog:any;
    commentActivityDetail:any;

    toid1:any;
    toid2:any;
    toid3:any;

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
        this.deviceInnerWidth = window.innerWidth;

        this.route.params.subscribe({
            next:((params:any) => this.userId = params.id)
        });
    }

    @HostListener('window:resize',['$event'])
    onWindowResize(){
        this.deviceInnerWidth = window.innerWidth;
    }

    ngOnInit(): void {
        this.getUserDetail();
        this.getCommentActivities();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
        if(this.toid2) clearTimeout(this.toid2);
        if(this.toid3) clearTimeout(this.toid3);
    }

    getUserDetail() {
        this.spinnerService.loading.next(false);

        this.userService.getById(`?id=${this.userId}`).subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);

                if(res.user) {
                    this.userDetail = {
                        id: res.user.id,
                        createdAt: res.user.createdAt && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(res.user.createdAt), 'dd MMM yyyy'),
                        email: res.user.email,
                        name: res.user.name,
                        photo: res.user.photo,
                        status: res.user.status ? 'Active' : 'Inactive',
                        userLevel: res.user.userLevelId === "1" ? 'Chef User' : 'Normal User',
                    }
                }
            }),
            error:(err => {
                this.spinnerService.loading.next(false);

                this.dialogService.showError(err);
            })
        });
    }

    userBlock() {
        this.dialogService.showConfirm({
            title:'Block User',
            description:'Do you really want to block this user? If this user is blocked, reports related to it will be blocked. This action cannot be undone.',
            okButtonLabel:'Yes, Block',
        }).subscribe({
            next:(res => {
                if(res) {
                    this.spinnerService.loading.next(true);

                    this.userService.blockUser(`?id=${this.userId}`).subscribe({
                        next:((res:any) => {
                            this.spinnerService.loading.next(false);

                            if(res.success) {
                                this.toid2 = setTimeout(() => {
                                    this.toastService.showToast({
                                        icon:'../../../../../assets/images/general/check-bg-red.svg',
                                        title:'Blocked User',
                                        description:'you have been blocked the user.'
                                    });//2500
                                }, 0);
    
                                this.toid3 = setTimeout(() => {
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

    getCommentActivities() {
        this.spinnerService.loading.next(true);

        this.userService.getCommentActivitiesByUserIdWithPagin(`?userId=${this.userId}&page=${this.p}&limit=${this.perPage}`)
        .subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);

                this.totalCommentActivityCount = res.pagination?.totalCount;
                
                this.commentActivities = [...(res.data.map((x:any) => ({
                    ...x,
                    date: x.date && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(x.date), 'dd MMM yyyy, HH:mm'),
                })))];
            }),
            error:(err => {
                this.spinnerService.loading.next(false);
                this.dialogService.showError(err);
            })
        });
    }

    showCommentActivityDetail(cmtaty:any) {
        this.commentActivityDetail = {...cmtaty};

        this.toid1 = setTimeout(() => {
            this.commentActivityDetailDialog = <HTMLElement>document.getElementById('commentActivityDetailDialog');
            if(this.commentActivityDetailDialog) {
                this.commentActivityDetailDialog.style.display = 'block';
            }
        }, 0);
    }

    okCmtActivityDetail() {
        this.commentActivityDetailDialog.style.display = 'none';
    }

    goToList() {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.USERS}/${RouteNames.NORMAL_USERS}`]);
    }
}