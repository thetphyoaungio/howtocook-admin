import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({providedIn:'root'})
export class CategoryService {
    constructor(private http:HttpClient) {}

    getAll():Observable<any> {
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.CATEG}/getcategory`);
    }

    getAllWithPagin(qry:string):Observable<any> {//?page=1&limit=10&search
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.CATEG}/index${qry}`);
    }

    getAllRequested(qry:string):Observable<any> {//?page=1&limit=10&search
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.CATEG}/getRequestCategory${qry}`);
    }

    getById(qry:string):Observable<any> {//?id=8f65abe0-3288-4ea2-b463-d4e534c9ea7d
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.CATEG}/getById${qry}`);
    }

    createCategory(pl:any):Observable<any> {
        return this.http.post(`${environment.APIEP}/${environment.APIPATH}/${environment.CATEG}/create`, pl);
    }

    updateCategory(pl:any):Observable<any> {
        return this.http.patch(`${environment.APIEP}/${environment.APIPATH}/${environment.CATEG}/update`, pl);
    }

    deleteCategory(qry:any):Observable<any> {//?id=8f65abe0-3288-4ea2-b463-d4e534c9ea7d
        return this.http.delete(`${environment.APIEP}/${environment.APIPATH}/${environment.CATEG}/delete${qry}`);
    }

    acceptRequestedCategory(pl:any):Observable<any> {
        return this.http.patch(`${environment.APIEP}/${environment.APIPATH}/${environment.CATEG}/accpetRequestCategory`, pl);
    }

    export(qry:string):Observable<any> {//?search
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.CATEG}/export${qry}`, { responseType: 'blob'});
    }
    exportRequestedCategories(qry:string):Observable<any> {//?search
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.CATEG}/exportRequestCategory${qry}`, { responseType: 'blob'});
    }

    updatePublicStatus(pl:any):Observable<any> {
        return this.http.patch(`${environment.APIEP}/${environment.APIPATH}/${environment.CATEG}/updateIsPublic`, pl);
    }
}