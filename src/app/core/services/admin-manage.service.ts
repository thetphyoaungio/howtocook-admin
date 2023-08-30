import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({providedIn:'root'})
export class AdminManageService {
    constructor(private http:HttpClient){}

    getAllAdmins(qry:string): Observable<any> {//?page=1&limit=10&search
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.ADMUSER}/index${qry}`);
    }

    getById(qry:string): Observable<any> {//?id=049c3250-45c8-455e-95f7-6d365ce7e0ad
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.ADMUSER}/getById${qry}`);
    }

    createAdminUser(payload:any): Observable<any> {
        return this.http.post(`${environment.APIEP}/${environment.APIPATH}/${environment.ADMUSER}/create`, payload);
    }

    deleteAdminUser(qry:string): Observable<any> {//?id=a366caf6-e6c5-46ab-9688-75bf0b90916d
        return this.http.delete(`${environment.APIEP}/${environment.APIPATH}/${environment.ADMUSER}/delete${qry}`);
    }

    updateUser(payload:any): Observable<any> {
        return this.http.patch(`${environment.APIEP}/${environment.APIPATH}/${environment.ADMUSER}/update`, payload);
    }
    
    export(qry:string): Observable<any> {//?search
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.ADMUSER}/exportAdminUser${qry}`, { responseType: 'blob'});
    }
}