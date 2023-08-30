import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";

import { 
    SpinnerService,
    DialogModalService,
    TPADateTimeService, 
    ToastService,
} from "src/app/core/utils";

import { UserService, PostService } from "src/app/core/services";

import RouteNames from "src/app/core/helpers/route-names.helper";

@Component({
    templateUrl:'./user-detail.component.html',
    styleUrls:['./user-detail.component.scss']
})
export class ChefUsersUserDetailComponent implements OnInit, OnDestroy {
    userId:any;
    userDetail:any;
    userPosts:Array<any>|any;

    p: number = 1;
    perPage: number = 4;

    deviceInnerWidth=0;

    toid1:any;
    toid2:any;

    constructor(
        private spinnerService:SpinnerService,
        private userService:UserService,
        private postService:PostService,
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
        this.getPosts();
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
                        email: res.user.email,
                        name: res.user.name,
                        photo: res.user.photo,
                        status: res.user.status ? 'Active' : 'Inactive',
                        userLevel: res.user.userLevelId === "1" ? 'Chef User' : (res.user.userLevelId === "2" ? 'Normal User' : '-'),
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

    getPosts() {
        this.spinnerService.loading.next(true);

        this.postService.getByUserIdWithPagin(`?userId=${this.userId}&page=${this.p}&limit=${this.perPage}`).subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);

                this.userPosts = [...(res.data.map((x:any) => 
                    ({
                        id: x.id,
                        title: x.title,
                        createdAt: x.createdAt && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(x.createdAt), 'dd MMM yyyy, HH:mm'),
                        category: {id: x.category?.id, name: x.category?.name}
                    })
                ))];
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
                                this.toid1 = setTimeout(() => {
                                    this.toastService.showToast({
                                        icon:'../../../../../assets/images/general/check-bg-red.svg',
                                        title:'Blocked User',
                                        description:'you have been blocked the user.'
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

    gotoPostDetail(post:any) {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.USERS}/${RouteNames.CHEF_USERS}/${RouteNames.CHEF_USERS_POST_DETAIL}`, post.id]);
    }

    goToList() {
        this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.USERS}/${RouteNames.CHEF_USERS}`]);
    }
}