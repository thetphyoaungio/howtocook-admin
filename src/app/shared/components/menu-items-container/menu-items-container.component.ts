import { Component, AfterViewInit, OnDestroy, HostListener } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

import { 
    HeaderMenuSidebarOnOffService, 
    DialogModalService,
    MenuRouterService,
} from "src/app/core/utils";

import RouteNames from "src/app/core/helpers/route-names.helper";
import { MENUS } from "src/app/core/helpers/menu-list.helper";
import { MenuLabels } from "src/app/core/helpers/menu-label.helper";

const MenuIconPath = '../../../../assets/images/shared/menu-sidebar';

const MenusWithChilds = [
    RouteNames.REPORTS, 
    RouteNames.CATEGORIES, 
    RouteNames.USERS, 
    RouteNames.ADMIN_MANAGEMENT, 
    RouteNames.SETTING,
];//for selected-menu click toggle stage

@Component({
    selector:'menu-items-container',
    templateUrl:'./menu-items-container.component.html',
    styleUrls:['./menu-items-container.component.scss']
})
export class MenuItemsContainerComponent implements AfterViewInit, OnDestroy {
    menus = [...MENUS];
    
    isMenuCollapse = false;

    selectedMenu:string | any;
    selectedSubMenu:string | any;

    htcRoute:any;

    deviceInnerWidth = 0;

    toid1:any;
    toid2:any;
    toid3:any;
    toid4:any;
    toid5:any;
    toid6:any;

    constructor(
        private headerMenuSidebarOnOffService:HeaderMenuSidebarOnOffService, 
        private dialogModalService:DialogModalService,
        private menuRouterService:MenuRouterService,
        private router:Router,
    ) {
        this.deviceInnerWidth = window.innerWidth;

        this.headerMenuSidebarOnOffService.menusidebarStage.subscribe({
            next:(v => {
                this.isMenuCollapse = v === 0;
                
                if(this.isMenuCollapse) {
                    this.menus.forEach((x:any) => {
                        this.changeUIMenuBgFontColor(`menu-${x.id}`, 'none', 'black');
                        this.changeUIMenuIconColor(x, 'black', `menu-${x.id}`);
                        
                        if(x.childs.length>0) {
                            this.collapseExpendSubMenu(x, 'submenu-collapse');
                            this.changeUIMenuUpDownIcon(x, 'black/chevron-down.svg');
                        }
                    });
                } else {
                    const menuContainerEl = <HTMLElement>document.querySelector('.menu-items-container');
                    if(menuContainerEl) menuContainerEl.style.display = 'none';//*to hide then show with "fadeIn" animation!
                    
                    if(this.selectedMenu) {
                        if(this.htcRoute) {
                            this.RouteToMenuUIUpdateHandler();
                        } else {
                            this.htcRoute = [...window.location.pathname.split('/')];

                            this.toid1 = setTimeout(() => {
                                this.RouteToMenuUIUpdateHandler();
                            }, 0);
                        }
                    }

                    this.toid2 = setTimeout(() => {
                        if(menuContainerEl) {
                            menuContainerEl.style.display = 'block';
                            menuContainerEl.classList.add('fade-in-image');
                        }
                    }, 350);
                }
            })
        });

        this.toid3 = this.router.events.subscribe((evt:any) => {
            if(evt instanceof NavigationEnd) {
                const route = evt.urlAfterRedirects.split('/');

                this.htcRoute = [...route];
                
                this.toid4 = setTimeout(() => {
                    this.RouteToMenuUIUpdateHandler();
                }, 100);
            }
        });
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize(){
        this.deviceInnerWidth = window.innerWidth;
    }

    ngAfterViewInit(): void {
        this.setMaxHeightMenuContainer();

        setTimeout(() => {
            if(this.deviceInnerWidth <= 425) {
                const menuOnOffSidebarImg = <HTMLElement>document.querySelector('.menu-sidebar-onoff-img');
                if(menuOnOffSidebarImg) {
                    menuOnOffSidebarImg.click();
                }
            }
        }, 0);
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
        if(this.toid2) clearTimeout(this.toid2);
        if(this.toid3) clearTimeout(this.toid3);
        if(this.toid4) clearTimeout(this.toid4);
        if(this.toid5) clearTimeout(this.toid5);
        if(this.toid6) clearTimeout(this.toid6);
    }

    onClickMenuItem(menu:any) {
        if(menu.menuLabel === MenuLabels.LOGOUT) {
            this.dialogModalService.showLogout('Are you sure to logout?');

        } else {
            /* if(MenusWithChilds.includes(this.htcRoute[2]) 
            && ((this.selectedMenu?.menuLabel === MenuLabels.ADMIN_MANAGEMENT ? 
            RouteNames.ADMIN_MANAGEMENT : this.selectedMenu?.menuLabel)?.toLowerCase() === this.htcRoute[2])
            && !this.isClickSubMenu) {
                
                //menu items are set to initial stage
                this.menus.forEach((x:any) => {
                    this.changeUIMenuBgFontColor(`menu-${x.id}`, 'none', 'black');
                    this.changeUIMenuIconColor(x, 'black', `menu-${x.id}`);

                    //childs menu set to collapse
                    if(x.childs.length>0) {
                        this.collapseExpendSubMenu(x, 'submenu-collapse');
                        this.changeUIMenuUpDownIcon(x, 'black/chevron-down.svg');
                    }
                });

                this.toid6 = setTimeout(() => {
                    this.selectedMenu = undefined;
                }, 0);

                this.isClickSubMenu = false;

            } else {
                this.menuRouterService.goto(menu.menuLabel);

                this.isClickSubMenu = false;
            } */

            this.menuRouterService.goto(menu.menuLabel);
        } 
    }

    isClickSubMenu=false;
    onClickSubMenuItem(submenu:any, evt:any){
        evt.stopPropagation();

        console.log('Hihi...')

        this.isClickSubMenu = true;

        this.menuRouterService.goto(submenu.menuLabel);
    }
    
    updateSelectedNoChildsMenuUI(menu:any) {
        if(!this.isMenuCollapse) {
            this.changeUIMenuBgFontColor(`menu-${menu.id}`, '#C43704', 'white');
            this.changeUIMenuIconColor(menu, 'white', `menu-${menu.id}`);
        }
        
        //other menu items are set to initial stage
        this.menus.forEach((x:any) => {
            if(x.id!==menu.id){
                this.changeUIMenuBgFontColor(`menu-${x.id}`, 'none', 'black');
                this.changeUIMenuIconColor(x, 'black', `menu-${x.id}`);

                //childs menu set to collapse
                if(x.childs.length>0) {
                    this.collapseExpendSubMenu(x, 'submenu-collapse');
                    this.changeUIMenuUpDownIcon(x, 'black/chevron-down.svg');
                }
            }
        });
    }

    updateSelectedWithChildsMenuUI(menu:any) {
        if(!this.isMenuCollapse) {
            this.changeUIMenuBgFontColor(`menu-${menu.id}`, '', '#C43704', false);
            this.changeUIMenuIconColor(menu, 'red', `menu-${menu.id}`);
            
            this.changeUIMenuUpDownIcon(menu, 'red/chevron-up.svg');

            //expend sub menus
            this.collapseExpendSubMenu(menu, 'submenu-expend', true);

            this.RouteToChildMenuUIUpdateHandler(menu);
            
            //other menu items are set to initial stage
            this.menus.forEach((x:any) => {
                if(x.id!==menu.id){
                    this.changeUIMenuBgFontColor(`menu-${x.id}`, 'none', 'black');
                    this.changeUIMenuIconColor(x, 'black', `menu-${x.id}`);

                    //childs menu set to collapse
                    if(x.childs.length>0) {
                        this.collapseExpendSubMenu(x, 'submenu-collapse');
                        this.changeUIMenuUpDownIcon(x, 'black/chevron-down.svg');
                    }
                }
            });

            this.toid5 = setTimeout(() => {
                this.setMaxHeightMenuContainer();
            }, 1);
        }
    }

    changeUIMenuBgFontColor(menuElId:any, bgcolor:string, fontcolor:string, noSubMenus:boolean=true) {
        const targetel = <HTMLElement>document.getElementById(menuElId);
        
        if(targetel) {
            noSubMenus && (targetel.style.background = bgcolor);
            targetel.style.color = fontcolor;
        }
    }

    changeUIMenuIconColor(menu:any, iconcolor:string, menuElId:string) {
        const targetel = <HTMLElement>document.getElementById(menuElId);
                
        (<HTMLElement>(targetel.firstChild)?.firstChild).setAttribute('src',`${MenuIconPath}/${iconcolor}/${menu.iconfile}`);
    }

    changeUIMenuUpDownIcon(submenu:any, updownIcon:string) {
        const targetDDownIcon = <HTMLElement>document.getElementById(`menu-dropdown-icon-${submenu.id}`);
        targetDDownIcon.setAttribute('src', `${MenuIconPath}/${updownIcon}`);
    }

    collapseExpendSubMenu(menu:any, collapseExpend:string, isExpend:boolean=false) {
        const submenusEl = <HTMLElement>document.getElementById(`expend-group-menus-${menu.id}`);
        if(submenusEl) {
            submenusEl.setAttribute('class', `p-2 ${collapseExpend}`);

            if(isExpend) {
                submenusEl.style.color = 'black';

                if(this.selectedSubMenu) {
                    this.changeUIMenuBgFontColor(`submenu-${this.selectedSubMenu.id}`,'#C43704','white');

                    //other menu items are set to initial stage
                    this.selectedMenu.childs.forEach((x:any) => {
                        if(x.id !== this.selectedSubMenu.id){
                            this.changeUIMenuBgFontColor(`submenu-${x.id}`, 'none', 'black');
                        }
                    });
                }
            }
        }
    }

    //set max height of MenuContainer
    setMaxHeightMenuContainer() {
        const logoTxtEl = <HTMLElement>document.querySelector('dashboard-logo-title');
        if(logoTxtEl) {
            const menuCtnrEl = <HTMLElement>document.querySelector('.menu-items-container');
            if(menuCtnrEl) {
                let maxHeight$ = window.innerHeight - logoTxtEl.offsetHeight;
                //if(window.innerWidth <= 425) {
                    const header = <HTMLElement>document.querySelector('.header-container');
                    if(header) maxHeight$ -= header.offsetHeight;
                //}

                menuCtnrEl.style.maxHeight = `${maxHeight$}px`;
                menuCtnrEl.style.overflowY = 'auto';
            }
        }
    }

    RouteToMenuUIUpdateHandler() {
        if(MenusWithChilds.includes(this.htcRoute[2]) 
        && ((this.selectedMenu?.menuLabel === MenuLabels.ADMIN_MANAGEMENT ? 
        RouteNames.ADMIN_MANAGEMENT : this.selectedMenu?.menuLabel)?.toLowerCase() === this.htcRoute[2])
        && !this.isClickSubMenu) {
            //console.log('this.selectedMenu>> ', this.selectedMenu)
            //console.log('this.htcRoute[2]>> ', this.htcRoute[2])

            //menu items are set to initial stage
            this.menus.forEach((x:any) => {
                this.changeUIMenuBgFontColor(`menu-${x.id}`, 'none', 'black');
                this.changeUIMenuIconColor(x, 'black', `menu-${x.id}`);

                //childs menu set to collapse
                if(x.childs.length>0) {
                    this.collapseExpendSubMenu(x, 'submenu-collapse');
                    this.changeUIMenuUpDownIcon(x, 'black/chevron-down.svg');
                }
            });

            this.toid6 = setTimeout(() => {
                this.selectedMenu = undefined;
            }, 0);

            this.isClickSubMenu = false;

        } else {
            switch(this.htcRoute[2]){

                case RouteNames.HOME:{
                    this.selectedMenu = MENUS[0];
    
                    this.updateSelectedNoChildsMenuUI(MENUS[0]);
                    
                    break;
                }
                case RouteNames.TIPS:{
                    this.selectedMenu = MENUS[1];
    
                    this.updateSelectedNoChildsMenuUI(MENUS[1]);
                    
                    break;
                }
                case RouteNames.REPORTS:{
                    this.selectedMenu = MENUS[2];
    
                    switch(this.htcRoute[3]){
                        /* case RouteNames.ADS_REPORT:{
                            this.selectedSubMenu = MENUS[2].childs[0];
    
                            break;
                        } */
                        case RouteNames.NEW_USERS_REPORT:{
                            this.selectedSubMenu = MENUS[2].childs[0];
                            
                            break;
                        }
                        case RouteNames.DATE_REPORT:{
                            this.selectedSubMenu = MENUS[2].childs[1];
    
                            break;
                        }
                        case RouteNames.USERS_REPORT:{
                            this.selectedSubMenu = MENUS[2].childs[2];
                            
                            break;
                        }
                        case RouteNames.CHEF_USERS_REPORT:{
                            this.selectedSubMenu = MENUS[2].childs[3];
                            
                            break;
                        }
                    }
    
                    this.updateSelectedWithChildsMenuUI(MENUS[2]);
                    
                    break;
                }
                case RouteNames.CATEGORIES:{
                    this.selectedMenu = MENUS[3];
    
                    switch(this.htcRoute[3]){
                        case RouteNames.ALL_CATEGORIES:{
                            this.selectedSubMenu = MENUS[3].childs[0];
    
                            break;
                        }
                        case RouteNames.REQUESTED_CATEGORIES:{
                            this.selectedSubMenu = MENUS[3].childs[1];
                            
                            break;
                        }
                    }
    
                    this.updateSelectedWithChildsMenuUI(MENUS[3]);
                    
                    break;
                }
                case RouteNames.USERS:{
                    this.selectedMenu = MENUS[4];
    
                    switch(this.htcRoute[3]){
                        case RouteNames.ALL_USERS:{
                            this.selectedSubMenu = MENUS[4].childs[0];
    
                            break;
                        }
                        case RouteNames.NORMAL_USERS:{
                            this.selectedSubMenu = MENUS[4].childs[1];
                            
                            break;
                        }
                        case RouteNames.CHEF_USERS:{
                            this.selectedSubMenu = MENUS[4].childs[2];
                            
                            break;
                        }
                        case RouteNames.REQUEST_CHEF_USERS:{
                            this.selectedSubMenu = MENUS[4].childs[3];
                            
                            break;
                        }
                        case RouteNames.BLOCK_LIST_USERS:{
                            this.selectedSubMenu = MENUS[4].childs[4];
                            
                            break;
                        }
                    }
                    
                    if(!['date-report-daily-posts', 'date-report-daily-new-users','users-report']
                    .includes(this.htcRoute[this.htcRoute.length-1])) {
                        this.updateSelectedWithChildsMenuUI(MENUS[4]);
                    }
                    
                    break;
                }
                case RouteNames.ADMIN_MANAGEMENT:{
                    this.selectedMenu = MENUS[5];
    
                    switch(this.htcRoute[3]){
                        case RouteNames.ADMIN_LIST:{
                            this.selectedSubMenu = MENUS[5].childs[0];
    
                            break;
                        }
                    }
    
                    if(!['profile-detail'].includes(this.htcRoute[this.htcRoute.length-1])) {
                        this.updateSelectedWithChildsMenuUI(MENUS[5]);
                    }
                    
                    break;
                }
                case RouteNames.CUSTOM_FEEDBACK:{
                    this.selectedMenu = MENUS[6];
    
                    this.updateSelectedNoChildsMenuUI(MENUS[6]);
                    
                    break;
                }
                case RouteNames.SETTING:{
                    this.selectedMenu = MENUS[7];
    
                    switch(this.htcRoute[3]){
                        case RouteNames.SETTING_FAQS_LIST:{
                            this.selectedSubMenu = MENUS[7].childs[0];
    
                            break;
                        }
                        case RouteNames.SETTING_CUSTOM_ADS_LIST:{
                            this.selectedSubMenu = MENUS[7].childs[1];
    
                            break;
                        }
                        case RouteNames.SETTING_VERSION_UPDATE_LIST:{
                            this.selectedSubMenu = MENUS[7].childs[2];
    
                            break;
                        }
                    }
    
                    this.updateSelectedWithChildsMenuUI(MENUS[7]);
                    
                    break;
                }
                case RouteNames.PROFILE_UPDATE:{
                    //other menu items are set to initial stage
                    this.menus.forEach((x:any) => {
                        this.changeUIMenuBgFontColor(`menu-${x.id}`, 'none', 'black');
                        this.changeUIMenuIconColor(x, 'black', `menu-${x.id}`);
    
                        //childs menu set to collapse
                        if(x.childs.length>0) {
                            this.collapseExpendSubMenu(x, 'submenu-collapse');
                            this.changeUIMenuUpDownIcon(x, 'black/chevron-down.svg');
                        }
                    });
    
                    break;
                }
            }

            this.isClickSubMenu = false;
        }
    }

    RouteToChildMenuUIUpdateHandler(menu:any) {
        switch(this.htcRoute[2]){
            
            case RouteNames.USERS:{
                
                switch(this.htcRoute[3]){
                    case RouteNames.ALL_USERS:{
                        this.changeUIMenuBgFontColor(`submenu-${menu.childs[0]?.id}`, '#C43704', 'white');

                        break;
                    }
                    case RouteNames.NORMAL_USERS:{
                        this.changeUIMenuBgFontColor(`submenu-${menu.childs[1]?.id}`, '#C43704', 'white');

                        break;
                    }
                    case RouteNames.CHEF_USERS:{
                        this.changeUIMenuBgFontColor(`submenu-${menu.childs[2]?.id}`, '#C43704', 'white');

                        break;
                    }
                    case RouteNames.REQUEST_CHEF_USERS:{
                        this.changeUIMenuBgFontColor(`submenu-${menu.childs[3]?.id}`, '#C43704', 'white');

                        break;
                    }
                    case RouteNames.BLOCK_LIST_USERS:{
                        this.changeUIMenuBgFontColor(`submenu-${menu.childs[4]?.id}`, '#C43704', 'white');

                        break;
                    }
                }

                break;
            }
            case RouteNames.ADMIN_MANAGEMENT:{
                switch(this.htcRoute[3]){
                    case RouteNames.ADMIN_LIST:{
                        this.changeUIMenuBgFontColor(`submenu-${menu.childs[0]?.id}`, '#C43704', 'white');

                        break;
                    }
                }

                break;
            }
            case RouteNames.CATEGORIES:{
                switch(this.htcRoute[3]){
                    case RouteNames.ALL_CATEGORIES:{
                        this.changeUIMenuBgFontColor(`submenu-${menu.childs[0]?.id}`, '#C43704', 'white');

                        break;
                    }
                    case RouteNames.REQUESTED_CATEGORIES:{
                        this.changeUIMenuBgFontColor(`submenu-${menu.childs[1]?.id}`, '#C43704', 'white');

                        break;
                    }
                }

                break;
            }
            case RouteNames.REPORTS:{
                switch(this.htcRoute[3]){
                    /* case RouteNames.ADS_REPORT:{
                        this.changeUIMenuBgFontColor(`submenu-${menu.childs[0]?.id}`, '#C43704', 'white');

                        break;
                    } */
                    case RouteNames.NEW_USERS_REPORT:{
                        this.changeUIMenuBgFontColor(`submenu-${menu.childs[0]?.id}`, '#C43704', 'white');

                        break;
                    }
                    case RouteNames.DATE_REPORT:{
                        this.changeUIMenuBgFontColor(`submenu-${menu.childs[1]?.id}`, '#C43704', 'white');

                        break;
                    }
                    case RouteNames.USERS_REPORT:{
                        this.changeUIMenuBgFontColor(`submenu-${menu.childs[2]?.id}`, '#C43704', 'white');

                        break;
                    }
                    case RouteNames.CHEF_USERS_REPORT:{
                        this.changeUIMenuBgFontColor(`submenu-${menu.childs[3]?.id}`, '#C43704', 'white');

                        break;
                    }
                }

                break;
            }
            case RouteNames.SETTING:{
                switch(this.htcRoute[3]){
                    case RouteNames.SETTING_FAQS_LIST:{
                        this.changeUIMenuBgFontColor(`submenu-${menu.childs[0]?.id}`, '#C43704', 'white');

                        break;
                    }
                    case RouteNames.SETTING_CUSTOM_ADS_LIST:{
                        this.changeUIMenuBgFontColor(`submenu-${menu.childs[1]?.id}`, '#C43704', 'white');

                        break;
                    }
                    case RouteNames.SETTING_VERSION_UPDATE_LIST:{
                        this.changeUIMenuBgFontColor(`submenu-${menu.childs[2]?.id}`, '#C43704', 'white');

                        break;
                    }
                }

                break;
            }
        }
    }
}