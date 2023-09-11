import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({providedIn:'root'})
export class FeedBackService {
    constructor(private http:HttpClient) {}

    getAllWithPagin(qry:string):Observable<any> {//?page=1&limit=10&search
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.FEDBCK}/index${qry}`);
    }

    getDetailById(qry:string):Observable<any> {//?id=12e4df58-1a36-466c-b0dd-705a4cf06b69
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.FEDBCK}/getById${qry}`);
    }
}