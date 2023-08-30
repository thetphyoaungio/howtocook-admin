import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { MenuLabels } from '../helpers/menu-label.helper';
import RouteNames from '../helpers/route-names.helper';

@Injectable({providedIn:'root'})
export class MenuRouterService {

    constructor(private router:Router) {}

    goto(menuname:string){
        console.log('PASSED menuname>> ',menuname);
        
        switch(menuname) {
            //**Stand-alone & Parent Menus
            case MenuLabels.DASHBOARD : {
                this.router.navigate([`/${RouteNames.DASHBOARD}`]);
                break;
            }
            case MenuLabels.TIPS : {
                this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.TIPS}`]);
                break;
            }
            case MenuLabels.REPORTS : {
                this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.REPORTS}`]);
                break;
            }
            case MenuLabels.CATEGORIES : {
                this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.CATEGORIES}`]);
                break;
            }
            case MenuLabels.USERS : {
                this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.USERS}`]);
                break;
            }
            case MenuLabels.ADMIN_MANAGEMENT : {
                this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.ADMIN_MANAGEMENT}`]);
                break;
            }

            //**Sub/Child Menus
            //*Reports
            case MenuLabels.ADS_REPORT : {
                this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.REPORTS}`]);
                break;
            }
            case MenuLabels.NEW_USERS_REPORT : {
                this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.REPORTS}/${RouteNames.NEW_USERS_REPORT}`]);
                break;
            }
            case MenuLabels.DATE_REPORT : {
                this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.REPORTS}/${RouteNames.DATE_REPORT}`]);
                break;
            }
            case MenuLabels.USERS_REPORT : {
                this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.REPORTS}/${RouteNames.USERS_REPORT}`]);
                break;
            }
            case MenuLabels.CHEF_USERS_REPORT : {
                this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.REPORTS}/${RouteNames.CHEF_USERS_REPORT}`]);
                break;
            }

            //*Users
            case MenuLabels.ALL_USERS : {
                this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.USERS}`]);
                break;
            }
            case MenuLabels.NORMAL_USERS : {
                this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.USERS}/${RouteNames.NORMAL_USERS}`]);
                break;
            }
            case MenuLabels.CHEF_USERS : {
                this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.USERS}/${RouteNames.CHEF_USERS}`]);
                break;
            }
            case MenuLabels.REQUEST_CHEF_USERS : {
                this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.USERS}/${RouteNames.REQUEST_CHEF_USERS}`]);
                break;
            }
            case MenuLabels.BLOCK_LIST_USERS : {
                this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.USERS}/${RouteNames.BLOCK_LIST_USERS}`]);
                break;
            }

            //*Categories
            case MenuLabels.ALL_CATEGORIES : {
                this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.CATEGORIES}`]);
                break;
            }
            case MenuLabels.REQUESTED_CATEGORIES : {
                this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.CATEGORIES}/${RouteNames.REQUESTED_CATEGORIES}`]);
                break;
            }

            //*Admin Manage
            case MenuLabels.ADMIN_LIST : {
                this.router.navigate([`/${RouteNames.DASHBOARD}/${RouteNames.ADMIN_MANAGEMENT}`]);
                break;
            }
        }
    }
}