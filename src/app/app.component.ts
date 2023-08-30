import { Component, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './core/services';

import { 
  SessionStorageService, 
  SpinnerService, 
  DialogModalService,
  LocalStorageService,
  CryptoService, 
} from './core/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  spinner:any;

  logoutDialogModalEl:any;

  deviceInnerWidth = 0;

  dialogModalData:any;
  messageDialogModalEl:any;
  
  confirmDialogEl:any;

  loggedInUser:any;

  toid1:any;
  toid2:any;

  constructor( 
    private spinnerService:SpinnerService,
    private dialogModalService:DialogModalService, 
    private authService:AuthService,
    private router:Router,
    private sessionService:SessionStorageService,
    private localService:LocalStorageService,
    private cryptoService:CryptoService
  ) {
    const t = this.localService.getLoggedInUser();
    if(t) {
      this.loggedInUser = {...(JSON.parse(this.cryptoService.decrypt(t)))}
      console.log('Got this.loggedInUser>> ',this.loggedInUser);
      
    }

    this.deviceInnerWidth = window.innerWidth;

    this.dialogModalService.isShow.subscribe({
      next:((data:any) => {
        this.dialogModalData = {...JSON.parse(data)};

        if(this.dialogModalData.status === 'logout') {
          this.logoutDialogModalEl.style.display = 'block';

        } else if(this.dialogModalData.status === 'confirm') {
          this.confirmDialogEl.style.display = 'block';
          
        } else {
          this.messageDialogModalEl.style.display = 'block';
        }
      })
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(){
    this.deviceInnerWidth = window.innerWidth;
  }

  ngAfterViewInit(): void {
    this.spinnerHandler();

    this.logoutDialogModalEl = <HTMLElement>document.getElementById('logoutDialog');
    this.messageDialogModalEl = <HTMLElement>document.getElementById('messageDialog');
    
    this.confirmDialogEl = <HTMLElement>document.getElementById('confirmDialog');
  }

  ngOnDestroy(): void {
    if(this.toid1) clearTimeout(this.toid1);
    if(this.toid2) clearTimeout(this.toid2);
  }

  spinnerHandler() {
    this.spinner = document.getElementById("mySpinner");

    this.spinnerService.loading.subscribe((resp:any)=>{
      this.spinner.style.display = resp?'block':'none';
    });
  }

  //Dialog Modal Funs
  onLogoutConfirm(result:boolean) {
    if(!result) {
      this.logoutDialogModalEl.style.display = 'none';
    } else {
      this.spinnerService.loading.next(true);

      let qry = `?userId=${this.loggedInUser?.id}`;

      this.authService.logout(qry).subscribe({
        next:((res:any) => {
          this.spinnerService.loading.next(false);

          this.logoutDialogModalEl.style.display = 'none';

          this.sessionService.clearSession();
          this.localService.clearAuth();

          this.toid1 = setTimeout(() => {
            this.router.navigate(['/']);
          }, 0);
        }),
        error:(err => {
          this.spinnerService.loading.next(false);

          this.logoutDialogModalEl.style.display = 'none';

          this.toid2 = setTimeout(() => {
            this.dialogModalService.showError(err);
          }, 0);
        }),
      });
    }
  }

  okMessageDialog() {
    if(this.messageDialogModalEl) {
      this.messageDialogModalEl.style.display = 'none';
    }
  }

  onConfirm(result:boolean) {
    this.dialogModalService.confirmResult.next(result);

    this.confirmDialogEl.style.display = 'none';
  }
  
}
