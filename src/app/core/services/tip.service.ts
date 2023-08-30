import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({providedIn:'root'})
export class TipService {
    constructor(private http:HttpClient){}

    getAllWithPagin(qry:string): Observable<any> {
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.TIP}/index${qry}`);
    }

    getTipsByLoggedInUser(): Observable<any> {
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.TIP}/get`);
    }

    getById(qry:string): Observable<any> {
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.TIP}/getById${qry}`);
    }

    getSavedTipsByLoggedInUser(): Observable<any> {
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.TIP}/getSavedByUser`);
    }

    create(pl:any):Observable<any> {
        return this.http.post(`${environment.APIEP}/${environment.APIPATH}/${environment.TIP}/create`, pl);
    }

    update(pl:any):Observable<any> {
        return this.http.patch(`${environment.APIEP}/${environment.APIPATH}/${environment.TIP}/update`, pl);
    }

    delete(qry:string): Observable<any> {
        return this.http.delete(`${environment.APIEP}/${environment.APIPATH}/${environment.TIP}/delete${qry}`);
    }

    export(qry:string): Observable<any> {//?search
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.TIP}/export${qry}`, { responseType: 'blob'});
    }

    updatePublicStatus(pl:any):Observable<any> {
        return this.http.patch(`${environment.APIEP}/${environment.APIPATH}/${environment.TIP}/updateIsPublic`, pl);
    }
}