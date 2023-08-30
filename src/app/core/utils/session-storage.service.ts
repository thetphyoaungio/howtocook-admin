import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class SessionStorageService {
    private CurrRte_Ktn = 'jkn78er';
    private SelMCurru_tKn = '0onm0r';
    private JHDTYY = 'ncby756';
    private JSGDF_yu65 = 'kakloer120';
    private KLJYO = 'MN67klkl';

    saveCurrentRoute(data:string):void {
        sessionStorage.removeItem(this.CurrRte_Ktn);
        sessionStorage.setItem(this.CurrRte_Ktn, data);
    }
    getCurrentRoute(): string | null {
        return sessionStorage.getItem(this.CurrRte_Ktn);
    }
    clearCurrentRoute() {
        sessionStorage.removeItem(this.CurrRte_Ktn);
    }

    saveCurrentSelectedMenuData(data:string):void {
        sessionStorage.removeItem(this.SelMCurru_tKn);
        sessionStorage.setItem(this.SelMCurru_tKn, data);
    }
    getCurrentSelectedMenuData(): string | null {
        return sessionStorage.getItem(this.SelMCurru_tKn);
    }
    clearCurrentSelectedMenuData() {
        sessionStorage.removeItem(this.SelMCurru_tKn);
    }
    
    clearSession() {
        this.clearCurrentRoute();
        this.clearCurrentSelectedMenuData();
    }
}