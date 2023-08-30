import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({providedIn:'root'})
export class DashboardService {

    constructor(private http:HttpClient) {}

    getDashboardCountData():Observable<any> {
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.ADMUSER}/dashboard`);
    }

    getRegisterAnalytics():Observable<any> {
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.ADMUSER}/getRegisterAnalytics`);
    }
}
