import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";

import { 
    LocalStorageService, 
    SessionStorageService 
} from "../utils";

@Injectable({providedIn:'root'})
export class DialogModalService {
    isShow = new Subject();
    confirmResult = new Subject();
    sendConfirmResult = new Subject();

    constructor(
        private router:Router,
        private localService:LocalStorageService,
        private sessionService:SessionStorageService,
    ){}

    showError(err:any, _duration:number=3000){
        if(err.status===401){
            this.localService.clearAuth();
            this.sessionService.clearSession();

            this.router.navigate(['/']);
        } else if(err.status!==200) {
            this.isShow.next(
                JSON.stringify(
                    {
                        title:'ERROR',
                        description: err.status==0 ? 'Something wrong, please check your internet connection!' : `${err.status}: ${err.statusText}`,
                        status:'error',
                        duration:_duration,
                        icon:'../../../assets/images/general/message-dialog-titles/error_dialog.svg'
                    }
                )
            );
        }
    }

    showSuccess(_description:string, _duration:number=2500){
        this.isShow.next(
            JSON.stringify(
                {
                    title:'SUCCESS',
                    description:_description,
                    status:'success',
                    duration:_duration,
                    icon:'../../../assets/images/general/message-dialog-titles/success_dialog.svg'
                }
            )
        );
    }

    showWarning(_description:string, _duration:number=2500){
        this.isShow.next(
            JSON.stringify(
                {
                    title:'WARNING',
                    description:_description,
                    status:'warning',
                    duration:_duration,
                    icon:'../../../assets/images/general/message-dialog-titles/warning_dialog.svg'
                }
            )
        );
    }

    showInfo(_description:string, _duration:number=2500){
        this.isShow.next(
            JSON.stringify(
                {
                    title:'INFO',
                    description:_description,
                    status:'info',
                    duration:_duration,
                    icon:'../../../assets/images/general/message-dialog-titles/info_dialog.svg'
                }
            )
        );
    }

    showLogout(_description:string, _duration:number=2500){
        this.isShow.next(
            JSON.stringify(
                {
                    title:'Logout Your Account',
                    description:_description,
                    status:'logout',
                    duration:_duration
                }
            )
        );
    }

    showConfirm(data:any): Observable<boolean|any> {
        this.isShow.next(JSON.stringify({ 
            ...data, 
            status:'confirm',
            icon: data.title.includes('Delete') ? 
            '../../../assets/images/general/delete-bg-red.svg' : (data.title.includes('Block') ? 
            '../../../assets/images/dashboard/user/all-users/user-detail/block-bg-light-red.svg' : 
            '../../../assets/images/general/message-dialog-titles/confirm_dialog.svg')
        }));

        return this.confirmResult;
    }
}