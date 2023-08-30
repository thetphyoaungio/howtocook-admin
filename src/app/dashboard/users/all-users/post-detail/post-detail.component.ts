import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";

import { 
    SpinnerService,
    DialogModalService,
    TPADateTimeService,
} from "src/app/core/utils";

import { PostService, CommentService } from "src/app/core/services";

import RouteNames from "src/app/core/helpers/route-names.helper";

@Component({
    templateUrl:'./post-detail.component.html',
})
export class AllUsersPostDetailComponent implements OnInit, OnDestroy {
    postId:any;
    postDetail:any;

    isPostView = true;
    postComments:Array<any> = [];

    commentViewBtnRotateVal = `3.142rad`;

    p = 1;
    perPage = 1;
    commentTotalCount=0;

    loadedPages:Array<number> = [];
    invoker:string|any;

    toid1:any;
    toid2:any;
    toid3:any;
    toid4:any;

    constructor(
        private spinnerService:SpinnerService,
        private postService:PostService,
        private commentService:CommentService,
        private router:Router,
        private route:ActivatedRoute,
        private dialogService:DialogModalService,
        private datePipe:DatePipe,
        private dateTimeService:TPADateTimeService,
    ){
        this.route.params.subscribe({
            next:((params:any) => {
                this.postId = params.id;
                this.invoker = params.invoker;
            })
        });
    }

    ngOnInit(): void {
        this.getDetail();
        this.getComments();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
        if(this.toid2) clearTimeout(this.toid2);
        if(this.toid3) clearTimeout(this.toid3);
        if(this.toid4) clearTimeout(this.toid4);
    }

    getDetail() {
        this.spinnerService.loading.next(true);

        this.postService.getById(`?id=${this.postId}`).subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);

                this.postDetail = {
                    photo: res.data.photo,
                    title: res.data.title,
                    description: res.data.description,
                    reactionCount: res.data.reactionCount,
                    shareCount: res.data.shareCount,
                    savedCount: res.data.savedCount,
                    cookingTime: res.data.cookingTime?.name,
                    servingCount: res.data.servingCount,
                    ingredients: res.data.ingredients.map((x:any) => ({
                        id: x.id,
                        name: x.name
                    })),
                    steps: [...res.data.steps],
                    userId: res.data.user?.id,
                }

                this.toid1 = setTimeout(() => {
                    this.postCommentsClick('post');
                }, 0);
            }),
            error:(err => {
                this.spinnerService.loading.next(false);

                this.dialogService.showError(err);
            })
        });
    }

    postCommentsClick(target:string) {
        if(target === 'post') {
           this.toid2 = setTimeout(() => {
                this.uiUpdateSelectedPostCommentsClick('post-select-id', 'comments-select-id');
            }, 0);

        } else if(target === 'comments') {
            this.toid3 = setTimeout(() => {
                this.uiUpdateSelectedPostCommentsClick('comments-select-id', 'post-select-id');
            }, 0);
        }

        this.isPostView = target === 'post';
    }

    backFromDetail(target:string) {
        if(target==='all-users') {
            this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.USERS}/${RouteNames.ALL_USERS}`]);

        } else if(target==='user-detail') {
            this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.USERS}/${RouteNames.ALL_USERS}/${RouteNames.ALL_USERS_USER_DETAIL}`, 
            this.postDetail.userId,'']);
            
        } else if(!target) {
            if(this.invoker === 'date-report-daily-posts') {
                this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.REPORTS}/${RouteNames.DATE_REPORT}/${RouteNames.DATE_REPORT_DAILY_POSTS}`,
                '','']);
            }
        }
    }
    
    uiUpdateSelectedPostCommentsClick(targetElId:string, noSelectElId:string) {
        const tEl = <HTMLElement>document.querySelector(`#${targetElId}`);
        const ntEl = <HTMLElement>document.querySelector(`#${noSelectElId}`);

        if(tEl && ntEl) {
            tEl.style.textDecoration = 'underline';
            tEl.style.color = '#C43704';

            ntEl.style.textDecoration = 'none';
            ntEl.style.color = '#7E7E7E';
        }
    }

    commentsViewLoadIconClick() {
        const cvbtn = <HTMLElement>document.querySelector('.comments-view-btn');

        if(this.postComments.length===this.commentTotalCount){
            this.bodyContentScrollTop();
        } else {
            //Fetch data
            if(this.commentTotalCount >= this.p * this.perPage) {
                this.p = this.loadedPages.length + 1;

                this.getComments();

                //UI update
                this.commentViewBtnRotateVal = this.commentViewBtnRotateVal === `0` ? `3.142rad`: `0`;
                cvbtn.style.transform = `rotate(${this.commentViewBtnRotateVal})`;

            } else {
                //UI update
                if(this.commentViewBtnRotateVal==='0') {
                    this.bodyContentScrollTop();
                }

                this.commentViewBtnRotateVal = '0';
                cvbtn.style.transform = `rotate(${this.commentViewBtnRotateVal})`;
            }
        }
    }

    getComments() {
        this.spinnerService.loading.next(true);

        if(!this.loadedPages.includes(this.p)) {
            this.loadedPages.push(this.p);
        }

        this.commentService.getByPostIdWithPagin(`?page=${this.p}&limit=${this.perPage}&postId=${this.postId}`)
        .subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);

                this.commentTotalCount = res.pagination?.totalCount;

                this.postComments.push(...res.data.map((x:any) => ({
                    id: x.id,
                    comment: x.comment,
                    createdAt: x.createdAt && this.datePipe.transform(this.dateTimeService.createDateForSafariMac_5(x.createdAt), 'dd-MM-yyyy'),
                    reaction: x.reaction,
                    photo: x.photo,
                    user:{
                        id: x.user?.id,
                        name: x.user?.name,
                        photo: x.user?.photo
                    }
                })));
            }),
            error:(err => {
                this.spinnerService.loading.next(false);
                this.dialogService.showError(err);
            })
        });
    }

    viewAllComments() {
        this.postComments = [];
        this.p = 1;
        this.perPage = this.commentTotalCount;

        this.getComments();

        //ui update
        this.toid4 = setTimeout(() => {
            const cvbtn = <HTMLElement>document.querySelector('.comments-view-btn');
            this.commentViewBtnRotateVal = '0';
            cvbtn.style.transform = `rotate(${this.commentViewBtnRotateVal})`;
        }, 1000);
    }

    bodyContentScrollTop() {
        document.querySelector('#body-content')?.scrollTo({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
        });
    }
}