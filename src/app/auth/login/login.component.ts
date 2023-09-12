import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import RouteNames from "src/app/core/helpers/route-names.helper";

import { AuthService } from "src/app/core/services";

import { 
    SpinnerService, 
    LocalStorageService, 
    CryptoService, 
    DialogModalService,
} from "src/app/core/utils";

@Component({
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
    inputType = 'password';
    loginForm:FormGroup|any;

    toid1:any;
    toid2:any;
    toid3:any;

    deviceWidth=0;

    constructor(
        private fb:FormBuilder, 
        private router:Router,
        private authService:AuthService, 
        private spinnerService:SpinnerService, 
        private localStoreService:LocalStorageService, 
        private cryptoService:CryptoService,
        private dialogService:DialogModalService,
    ) {
        this.deviceWidth = window.innerWidth;
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize() {
        this.deviceWidth = window.innerWidth;
    }

    ngOnInit(): void {
        this.formInit();
    }

    ngAfterViewInit(): void {
        this.setHeightFormContaier();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
        if(this.toid2) clearTimeout(this.toid2);
        if(this.toid3) clearTimeout(this.toid3);
    }

    formInit() {
        this.loginForm = this.fb.group({
            username:[null, [Validators.required, Validators.minLength(3)]],
            password:[null, [Validators.required, Validators.minLength(6)]]
        });
    }

    onLogin(formval:any) {
        if(this.loginForm.valid){
            
            const pl = {
                userName: formval.username,
                password: formval.password
            };

            this.spinnerService.loading.next(true);

            this.authService.login(JSON.stringify(pl)).subscribe({
                next:(res => {
                    this.spinnerService.loading.next(false);

                    if(res.user) {
                        //1. save logged-in user
                        this.localStoreService.saveLoggedInUser(this.cryptoService.encrypt(JSON.stringify(res.user)));

                        //2. save token
                        if(res.user.token) {
                            this.localStoreService.saveToken(this.cryptoService.encrypt(res.user.token));

                        } else {
                            this.dialogService.showWarning('Token is empty!');

                            this.toid2 = setTimeout(() => {
                                this.localStoreService.clearAuth();
                                
                                this.router.navigate([`/`]);
                            }, 2500);
                        }

                        //3. redirect to admin dashboard
                        this.toid1 = setTimeout(() => {
                            this.router.navigate([`/${RouteNames.DASHBOARD}`]);
                        }, 0);

                    } else {
                        this.dialogService.showWarning('Something wrong!');

                        this.toid3 = setTimeout(() => {
                            this.localStoreService.clearAuth();

                            this.router.navigate([`/`]);
                        }, 2500);
                    }
                }),
                error:(err => {
                    this.spinnerService.loading.next(false);
                    this.dialogService.showError(err);
                })
            });
        }
    }

    onCheckShowPassword(evt:any) {
        this.inputType = evt.target.checked ? 'text' : 'password';
    }

    //UI funs
    setHeightFormContaier() {
        const bc = <HTMLElement|any>document.querySelector('.login-form-container');
        if(bc) {
            bc.style.height = `${window.innerHeight}px`;
        } else {
            bc.style.height = `929px`;//default
        }
    }
}