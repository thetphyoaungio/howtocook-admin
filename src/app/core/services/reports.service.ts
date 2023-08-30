import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({providedIn:'root'})
export class ReportsService {

    constructor(private http:HttpClient) {}

    getAdsReport(qry:string):Observable<any>{//?search&page=1&limit=10&period=monthly&date=2023-07-02
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/ads/report${qry}`);
    }

    getNewUsersReport(qry:string):Observable<any>{////?search=&page=1&limit=10&period=daily&date=2023-07-03
        //?search=kop&page=1&limit=10&startDate=&endDate=
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.MOBUSER}/getNewUserReport${qry}`);
    }

    //---------------------------------------------====================-----------------------------------------------//
    getDateReport(qry:string):Observable<any>{//?date=2023-07-02
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/ads/getDateReport${qry}`);
    }

    //Daily
    getDailyPosts(qry:string):Observable<any>{//?page=1&limit=10&date=2023-07-14&search
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/ads/getDatePostReportByDaily${qry}`);
    }
    getDailyNewUsers(qry:string):Observable<any>{//?page=1&limit=10&date=2023-08-22&search
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/ads/getDateNewUserReportByDaily${qry}`);
    }

    //Monthly
    getMonthlyPosts(qry:string):Observable<any>{//?page=1&limit=10&date=2023-07-14&search
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/ads/getDatePostReportByMonthly${qry}`);
    }
    getMonthlyNewUsers(qry:string):Observable<any>{//?page=1&limit=10&date=2023-07-14&search
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/ads/getDateNewUserReportByMonthly${qry}`);
    }

    //Yearly
    getYearlyPosts(qry:string):Observable<any>{//?page=1&limit=10&date=2023-07-14&search
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/ads/getDatePostReportByYearly${qry}`);
    }
    getYearlyNewUsers(qry:string):Observable<any>{//?page=1&limit=10&date=2023-07-14&search
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/ads/getDateNewUserReportByYearly${qry}`);
    }
    //---------------------------------------------====================-----------------------------------------------//

    getUsersReport(qry:string):Observable<any>{//?userLevel=2&status=1&page=1&limit=5&search=
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.MOBUSER}/getUserReport${qry}`);
    }
    getUserDataCount() {
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.MOBUSER}/getUserDataCount`);
    }

    getChefUsersReport(qry:string):Observable<any>{//?search=&page=1&limit=10&startDate=2023-06-07&endDate=2023-09-09
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.MOBUSER}/getChefUserReport${qry}`);
    }
    
    //----------------------------------------------E X P O R T S---------------------------------------------------------//
    exportNewUsersReport(qry:string):Observable<any>{//?search&startDate=&endDate=
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.MOBUSER}/newUserReport${qry}`, { responseType: 'blob'});
    }
    exportChefUsersReport(qry:string):Observable<any>{//?search&startDate=&endDate=
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.MOBUSER}/chefUserReport${qry}`, { responseType: 'blob'});
    }
    exportUsersReport(qry:string):Observable<any>{//?userLevel=2&status=1&search=
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/${environment.MOBUSER}/userReport${qry}`, { responseType: 'blob'});
    }
    exportDateReport(qry:string):Observable<any>{//?date=2023-07-02
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/ads/dateReport${qry}`, { responseType: 'blob'});
    }
    exportDailyPosts(qry:string):Observable<any>{//?date=2023-08-28&search
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/ads/DatePostReportByDaily${qry}`, { responseType: 'blob'});
    }
    exportDailyNewUsers(qry:string):Observable<any>{//?date=2023-08-28&search
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/ads/DateNewUserReportByDaily${qry}`, { responseType: 'blob'});
    }
    exportMonthlyPosts(qry:string):Observable<any>{//?date=2023-08-28
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/ads/DatePostReportByMonthly${qry}`, { responseType: 'blob'});
    }
    exportMonthlyNewUsers(qry:string):Observable<any>{//?search&date=2023-07-02
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/ads/DateNewUserReportByMonthly${qry}`, { responseType: 'blob'});
    }
    exportYearlyPosts(qry:string):Observable<any>{//?date=2023-08-28
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/ads/DatePostReportByYearly${qry}`, { responseType: 'blob'});
    }
    exportYearlyNewUsers(qry:string):Observable<any>{//?date=2023-08-28
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/ads/DateNewUserReportByYearly${qry}`, { responseType: 'blob'});
    }

    
    exportAdsReport(qry:string):Observable<any>{//?search&period=monthly&date=2023-07-02
        return this.http.get(`${environment.APIEP}/${environment.APIPATH}/ads/AdsReport${qry}`, { responseType: 'blob'});
    }

}