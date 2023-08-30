import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({providedIn:'root'})
export class CommentService {
    constructor(private http:HttpClient) {}

    getByUserId(qry:string):Observable<any> {
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.COMNT}/getCommentByUserId${qry}`);
    }

    getByPostId(qry:string):Observable<any> {//?postId=1d2a5fdb-cd94-48b4-afd4-233b5ea7cbdc
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.COMNT}/getCommentByPostId${qry}`)
    }

    getByTipId(qry:string):Observable<any> {//?tipId=14591a1e-7919-47d3-9b85-87006d807057
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.COMNT}/getCommentByTipId${qry}`)
    }

    //added new apis
    getByPostIdWithPagin(qry:string):Observable<any> {//?page=1&limit=5&postId=1d2a5fdb-cd94-48b4-afd4-233b5ea7cbdc
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.COMNT}/getCommentByPostIdWithPagination${qry}`)
    }

}