import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({providedIn:'root'})
export class SettingService {
    constructor(private http:HttpClient) {}

    //*ADs
    getAllWithPagin(qry:string):Observable<any> {//?search=&page=1&limit=10
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.ADS}/index${qry}`);
    }

    getDetailById(qry:string):Observable<any> {//?id=762e0799-e585-4c83-9e70-364fe8b7cc22
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.ADS}/getById${qry}`);
    }

    create(payload:any):Observable<any> {
        return this.http.post(`${environment.APIEP}/${environment.APIPATH}/${environment.ADS}/create`, payload);
    }

    update(payload:any):Observable<any> {
        return this.http.patch(`${environment.APIEP}/${environment.APIPATH}/${environment.ADS}/update`, payload);
    }

    delete(qry:string):Observable<any> {//?id=762e0799-e585-4c83-9e70-364fe8b7cc22
        return this.http.delete(`${environment.APIEP}/${environment.APIPATH}/${environment.ADS}/delete${qry}`);
    }


    //*Version Update
    getAllWithPagin_VU(qry:string):Observable<any> {//?page=1&limit=10&search
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.APVU}/index${qry}`);
    }

    getDetailById_VU(qry:string):Observable<any> {//?id=1f9fd3ca-5494-405c-a272-84b2d5c4affc
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.APVU}/getById${qry}`);
    }

    create_VU(payload:any):Observable<any> {
        return this.http.post(`${environment.APIEP}/${environment.APIPATH}/${environment.APVU}/create`, payload);
    }

    update_VU(payload:any):Observable<any> {
        return this.http.patch(`${environment.APIEP}/${environment.APIPATH}/${environment.APVU}/update`, payload);
    }

    delete_VU(qry:string):Observable<any> {//?id=1f9fd3ca-5494-405c-a272-84b2d5c4affc
        return this.http.delete(`${environment.APIEP}/${environment.APIPATH}/${environment.APVU}/delete${qry}`);
    }

    //*FAQs
    getAllWithPagin_Faqs(qry:string):Observable<any> {//?page=1&limit=10&search
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.FQS}/index${qry}`);
    }

    getDetailById_Faqs(qry:string):Observable<any> {//?id=445e57b3-075b-47e3-bd93-e9f5671e61de
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.FQS}/getById${qry}`);
    }

    create_Faqs(payload:any):Observable<any> {
        return this.http.post(`${environment.APIEP}/${environment.APIPATH}/${environment.FQS}/create`, payload);
    }

    update_Faqs(payload:any):Observable<any> {
        return this.http.patch(`${environment.APIEP}/${environment.APIPATH}/${environment.FQS}/update`, payload);
    }

    delete_Faqs(qry:string):Observable<any> {//?id=a9b1d729-70e8-4a6a-a964-0d11f20d4ffe
        return this.http.delete(`${environment.APIEP}/${environment.APIPATH}/${environment.FQS}/delete${qry}`);
    }
}