import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { 
    SpinnerService, 
    DialogModalService, 
    ToastService,
} from "src/app/core/utils";

import { TipService } from "src/app/core/services";
import RouteNames from "src/app/core/helpers/route-names.helper";

@Component({
    templateUrl:'./create.component.html',
    styleUrls:['./create.component.scss']
})
export class TipCreateComponent implements OnInit, OnDestroy {
    createForm:FormGroup|any;

    profilePreview:string|any;
    profileImgFile:any;

    isPublic$ = false;

    toid1:any;

    constructor(
        private fb:FormBuilder,
        private spinnerService:SpinnerService,
        private tipService:TipService,
        private domSanitizer:DomSanitizer, 
        private dialogMService:DialogModalService, 
        private router:Router,
        private toastService:ToastService,
    ) {}

    ngOnInit(): void {
        this.buildForm();

        this.toid1 = setTimeout(() => {
            this.addSteps();
            this.addSteps();
        }, 0);
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
    }

    buildForm() {
        this.createForm = this.fb.group({
            title:['', Validators.required],
            description:['', Validators.required],
            steps: this.fb.array([])
        });
    }

    //*Steps form array
    get steps() : FormArray {
        return this.createForm.get("steps") as FormArray
    }
     
    newStep(): FormGroup {
        return this.fb.group({
          name: ['', Validators.required],
        });
    }
     
    addSteps() {
        if(this.steps.length < 9) {this.steps.push(this.newStep());}
        else {
            this.dialogMService.showWarning('Nine (9) steps maximum!');
        }
    }
     
    removeStep(i:number) {
        if(i === this.steps.controls.length-1) {this.steps.removeAt(i);}
    }

    addTipPhoto(evt:any) {
        this.profileImgFile = undefined;
        this.profileImgFile = <File>evt.target.files[0];
        
        const selectedFiles = evt.target.files;
    
        if (selectedFiles && selectedFiles[0]) {
            const numberOfFiles = selectedFiles.length;
            
            for (let i = 0; i < numberOfFiles; i++) {
                const reader = new FileReader();

                reader.onload = (e: any) => {
                    this.profilePreview = undefined;
                    this.profilePreview = this.domSanitizer.bypassSecurityTrustResourceUrl(e.target.result);
                };
                
                reader.readAsDataURL(selectedFiles[i]);
            }
        }
    }

    changeIsPublic(evt:any) {
        this.isPublic$ = evt.target.checked;
    }

    onCreate(formVal:any) {
        if(this.createForm.valid && this.profileImgFile) {

            this.spinnerService.loading.next(true);
            
            const pl = new FormData();
            pl.append('title', formVal.title);
            pl.append('description', formVal.description);
            pl.append('isPublic', this.isPublic$ ? '1' : '0');
            pl.append('photo', this.profileImgFile);
            pl.append('steps', JSON.stringify(formVal.steps));

            this.tipService.create(pl).subscribe({
                next:((res:any) => {
                    this.spinnerService.loading.next(false);
                    
                    this.goToList();
    
                    this.toastService.showToast({
                        icon:'../../../../../assets/images/general/check-bg-green.svg',
                        title:'Created Tip',
                        description:'you have been successfully created tip.'
                    });
                }),
                error: (err => {
                    this.spinnerService.loading.next(false);
    
                    this.dialogMService.showError(err);
                })
            });
        } else {
            this.dialogMService.showWarning('Please upload a photo.');
        }
    }

    onCancelCreate() {
        this.goToList();
    }

    goToList() {this.router.navigate([`${RouteNames.DASHBOARD}/${RouteNames.TIPS}`]);}
}