import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({providedIn:'root'})
export class AuthService {
    constructor(private http:HttpClient) {}

    login(payload:any): Observable<any> {
        return this.http.post(`${environment.APIEP}/${environment.APIPATH}/${environment.ADMUSER}/login_admin`, payload);
    }

    logout(qry:string): Observable<any> {
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.ADMUSER}/logout${qry}`);
    }
}