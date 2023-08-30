import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";

import { 
    SpinnerService, 
    DialogModalService, 
} from "src/app/core/utils";

@Component({
    selector:'htc-export-button',
    templateUrl:'./export-button.component.html',
})
export class HTCExportButtonComponent {
    @Input() htcServic:Observable<any> | any;
    @Input() query:string | any;
    @Input() fileName:string | any;

    constructor(
        private spinnerService:SpinnerService,
        private dialogService:DialogModalService,
    ) {}

    export() {
        this.spinnerService.loading.next(true);

        (this.getService(this.query)).subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);

                let blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                let file = new File([blob], `${this.fileName}.xlsx`);
                let fileUrl = URL.createObjectURL(file);

                var link = document.createElement("a");
                document.body.appendChild(link);
                link.setAttribute("href", fileUrl);
                link.setAttribute("download", `${this.fileName}.xlsx`);
                link.click();
            }),
            error:((err:any) => {
                console.log(err);
                
                this.spinnerService.loading.next(false);
                this.dialogService.showError(err);
            })
        });
    }

    getService(qry:string) {
        switch(this.fileName) {
            //reports module
            case 'new-users-report':{
                return this.htcServic.exportNewUsersReport(qry);
            }

            case 'date-report':{
                return this.htcServic.exportDateReport(qry);
            }
            case 'date-report-daily-posts':{
                return this.htcServic.exportDailyPosts(qry);
            }
            case 'date-report-daily-new-users':{
                return this.htcServic.exportDailyNewUsers(qry);
            }
            case 'date-report-monthly-posts':{
                return this.htcServic.exportMonthlyPosts(qry);
            }
            case 'date-report-monthly-new-users':{
                return this.htcServic.exportMonthlyNewUsers(qry);
            }
            case 'date-report-yearly-posts':{
                return this.htcServic.exportYearlyPosts(qry);
            }
            case 'date-report-yearly-new-users':{
                return this.htcServic.exportYearlyNewUsers(qry);
            }

            case 'users-report':{
                return this.htcServic.exportUsersReport(qry);
            }
            
            case 'chef-users-report':{
                return this.htcServic.exportChefUsersReport(qry);
            }

            //category module
            case 'requested-categories':{
                return this.htcServic.exportRequestedCategories(qry);
            }
            
            //user module
            case 'all-users':{
                return this.htcServic.exportAllUser(qry);
            }
            case 'normal-users':{
                return this.htcServic.exportNormalUsers(qry);
            }
            case 'chef-users':{
                return this.htcServic.exportChefUsers(qry);
            }
            case 'requested-chef-users':{
                return this.htcServic.exportRequestedChefUsers(qry);
            }
            case 'blocked-users':{
                return this.htcServic.exportBlockedUsers(qry);
            }

            default:{
                return this.htcServic.export(qry);
            }
        }
    }
}