import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({providedIn:'root'})
export class UserService {
    constructor(private http: HttpClient){}
    
    getAllUsers(qry:string): Observable<any> {//?userLevelId=-1&status=-1&page=2&limit=10&search 
        //* 'Chef' >> 1, 'Normal' >> 2 !
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.MOBUSER}/index${qry}`);
    }

    getById(qry:string): Observable<any> {//?id=092e429d-22d6-488f-8ee5-f9491edd9b8a
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.MOBUSER}/getById${qry}`);
    }

    blockUser(qry:string): Observable<any> {//?id=d491fd91-8b2f-49b5-b0b8-c3ba43b2ac50
        return this.http.delete(`${environment.APIEP}/${environment.APIPATH}/${environment.MOBUSER}/block${qry}`);
    }

    //added new apis
    getCommentActivitiesByUserIdWithPagin(qry:string): Observable<any> {//?userId=092e429d-22d6-488f-8ee5-f9491edd9b8a&page=1&limit=10
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.NOTI}/getActivityByUserId${qry}`);
    }

    getBlockedListUsers(qry:string): Observable<any> {//?page=1&limit=10
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.MOBUSER}/blockedUsers${qry}`);
    }

    unBlockUser(qry:string): Observable<any> {//?id=c201c02f-752b-40f6-b38a-427cc2585181
        return this.http.delete(`${environment.APIEP}/${environment.APIPATH}/${environment.MOBUSER}/unblock${qry}`);
    }

    getRequestedChefUsers(qry:string): Observable<any> {//?page=1&limit=10
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.MOBUSER}/getChefUserRequests${qry}`);
    }

    acceptChefUserRequest(pl:any): Observable<any> {
        return this.http.post(`${environment.APIEP}/${environment.APIPATH}/${environment.MOBUSER}/acceptRequest`, pl);
    }

    //
    exportAllUser(qry:string): Observable<any> {//?userLevelId=-1&status=-1&search 
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.MOBUSER}/exportAllUser${qry}`, { responseType: 'blob'});
    }
    exportNormalUsers(qry:string): Observable<any> {//?userLevelId=2&status=-1&search 
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.MOBUSER}/exportAllUser${qry}`, { responseType: 'blob'});
    }
    exportChefUsers(qry:string): Observable<any> {//?userLevelId=1&status=-1&search
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.MOBUSER}/exportAllUser${qry}`, { responseType: 'blob'});
    }
    exportRequestedChefUsers(qry:string): Observable<any> {//?search 
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.MOBUSER}/exportRequestedChefUser${qry}`, { responseType: 'blob'});
    }
    exportBlockedUsers(qry:string): Observable<any> {//?search 
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.MOBUSER}/exportBlockedUser${qry}`, { responseType: 'blob'});
    }
}