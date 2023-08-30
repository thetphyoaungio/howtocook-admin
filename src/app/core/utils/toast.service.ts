import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn:'root'})
export class ToastService {
    isShow = new Subject<any>();

    showToast(data:any, duration=3000) {
        this.isShow.next({...data, duration});
    }
}