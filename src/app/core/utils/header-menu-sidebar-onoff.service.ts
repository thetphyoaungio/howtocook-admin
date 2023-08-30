import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn:'root'})
export class HeaderMenuSidebarOnOffService {
    public menusidebarStage = new Subject();
}