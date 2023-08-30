import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class LocalStorageService {
    private KTn = 'cht-ktn';
    private L8dhgJK = 'kjo312';

    constructor(){}
    
    saveToken(token:string):void {
        localStorage.removeItem(this.KTn);
        localStorage.setItem(this.KTn, token);
    }
    getToken(): string | null {
        return localStorage.getItem(this.KTn);
    }
    clearToken(){
        localStorage.removeItem(this.KTn);
    }

    saveLoggedInUser(data:string):void {
        localStorage.removeItem(this.L8dhgJK);
        localStorage.setItem(this.L8dhgJK, data);
    }
    getLoggedInUser(): string | null {
        return localStorage.getItem(this.L8dhgJK);
    }
    clearLoggedInUser(){
        localStorage.removeItem(this.L8dhgJK);
    }
    
    clearAuth() {
        this.clearToken();
        this.clearLoggedInUser();
    }
}