import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({providedIn:'root'})
export class PostService {
    constructor(private http:HttpClient) {}

    getByUserId(qry:string):Observable<any> {//?userId=092e429d-22d6-488f-8ee5-f9491edd9b8a
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.POST}/getByUserId${qry}`);
    }

    getById(qry:string):Observable<any> {//?id=1d2a5fdb-cd94-48b4-afd4-233b5ea7cbdc
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.POST}/getById${qry}`)
    }

    getByCategory(qry:string):Observable<any> {//?categoryId=8cbce78b-e565-4137-a481-308613b69ecc
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.POST}/getByCategory${qry}`)
    }

    getByPagin(qry:string):Observable<any> {//?page=1&limit=10
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.POST}/getWithPagination${qry}`)
    }

    getSavedPostByFolder(qry:string):Observable<any> {//?folderId=5566098c-a155-47af-93d2-f48d5b731129
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.POST}/saved/getByFolderId${qry}`)
    }

    // added new apis
    getByUserIdWithPagin(qry:string):Observable<any> {//?userId=c201c02f-752b-40f6-b38a-427cc2585181&page=1&limit=10
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.POST}/getPostByUserIdWithPagination${qry}`);
    }

}