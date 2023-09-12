import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from "@angular/core";

import { ToastService } from "../core/utils";

@Component({
    templateUrl:'./dashboard.component.html',
    styleUrls:['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
    toastEl:any;
    toastData:any;

    headerContainerEl:any;
    headerContainerHeight = '0';

    toid1:any;
    toid2:any;
    toid3:any;
    toid4:any;
    toid5:any;
    toid6:any;

    constructor(private toastService:ToastService,) {
        this.toastService.isShow.subscribe({
            next:((data:any) => {
              this.toastData = {...data};
      
              this.toid1 = setTimeout(() => {
                this.toastEl.style.display = 'block';

                this.toid2 = setTimeout(() => {
                    if(this.toastEl) {
                        this.toastEl.style.display = 'none';

                        this.toid4 = setTimeout(() => {
                            this.toastData=null;
                        }, 0);
                    }
                }, +data.duration);
      
              }, 0);
      
            })
          });
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize(){
        if(this.headerContainerEl) {
            this.headerContainerHeight = `${this.headerContainerEl.offsetHeight}px`;
        }
    }

    ngOnInit(): void {
        this.toid3 = setTimeout(() => {
            this.headerContainerEl = <HTMLElement>document.querySelector('.header-container');
            if(this.headerContainerEl) {
                this.headerContainerHeight = `${this.headerContainerEl.offsetHeight}px`;
            }
        }, 1000);
        
        if(window.innerWidth <= 425) {
            this.toid5 = setTimeout(() => {
                this.setContentMaxHeight();
            }, 1000);
        } else {
            this.toid6 = setTimeout(() => {
                this.setContentMaxHeight();
            }, 200);
        }
    }

    ngAfterViewInit(): void {
        this.toastEl = <HTMLElement>document.getElementById('htcToast');

        const toastCloseEl = <HTMLElement>document.getElementById('toastCloseIconID');
        if(toastCloseEl){
            toastCloseEl.addEventListener('click', () => {
                this.toastEl.style.display = 'none';
            });
        }
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
        if(this.toid2) clearTimeout(this.toid2);
        if(this.toid3) clearTimeout(this.toid3);
        if(this.toid4) clearTimeout(this.toid4);
        if(this.toid5) clearTimeout(this.toid5);
        if(this.toid6) clearTimeout(this.toid6);
    }
    
    setContentMaxHeight() {
        const htcHeader = <HTMLElement>document.querySelector('.header-container');
        if(htcHeader) {
            const contentbody = <HTMLElement>document.querySelector('#body-content');

            contentbody.style.height = `${window.innerHeight - htcHeader.offsetHeight}px`;
        }
    }
}