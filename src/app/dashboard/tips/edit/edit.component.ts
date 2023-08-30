import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";

import { 
    SpinnerService, 
    DialogModalService, 
    ToastService,
} from "src/app/core/utils";

import { TipService } from "src/app/core/services";
import RouteNames from "src/app/core/helpers/route-names.helper";

@Component({
    templateUrl:'./edit.component.html',
    styleUrls:['./edit.component.scss']
})
export class TipEditComponent implements OnInit, OnDestroy {
    id$:any;
    getData:any;

    editForm:FormGroup|any;

    profilePreView:string|any;
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
        private route:ActivatedRoute,
    ) {
        this.route.params.subscribe({
            next:((params:any) => this.id$ = params.id)
        });
    }

    ngOnInit(): void {
        this.buildForm();

        this.getEditData();
    }

    ngOnDestroy(): void {
        if(this.toid1) clearTimeout(this.toid1);
    }

    buildForm() {
        this.editForm = this.fb.group({
            title:['', Validators.required],
            description:['', Validators.required],
            steps: this.fb.array([])
        });
    }

    //*Steps form array
    get steps() : FormArray {
        return this.editForm.get("steps") as FormArray
    }
     
    newStep(): FormGroup {
        return this.fb.group({
          name: ['', Validators.required],
        });
    }
     
    addSteps() {
        this.steps.push(this.newStep());
    }
     
    removeStep(i:number) {
        if(i === this.steps.controls.length-1) {this.steps.removeAt(i);}
    }

    getEditData() {
        this.spinnerService.loading.next(true);

        this.tipService.getById(`?id=${this.id$}`).subscribe({
            next:((res:any) => {
                this.spinnerService.loading.next(false);

                this.getData = {...res.data};

                if(res.data.steps.length > 0) {
                    res.data.steps.forEach(() => this.addSteps());
                }

                this.toid1 = setTimeout(() => {
                    this.editForm.patchValue({
                        title: res.data?.title,
                        description: res.data?.description,
                        steps: res.data.steps.map((x:any) => ({name:x.name}))
                    });
                }, 0);

                this.isPublic$ = res.data?.isPublic;

                this.profilePreView = res.data?.photo;
            }),
            error:(err => {
                this.spinnerService.loading.next(false);
                this.dialogMService.showError(err);
            })
        })
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
                    this.profilePreView = undefined;
                    this.profilePreView = this.domSanitizer.bypassSecurityTrustResourceUrl(e.target.result);
                };
                
                reader.readAsDataURL(selectedFiles[i]);
            }
        }
    }

    changeIsPublic(evt:any) {
        this.isPublic$ = evt.target.checked;
    }

    onEdit(formVal:any) {
        if(this.editForm.valid) {

            this.spinnerService.loading.next(true);
            
            const pl = new FormData();
            pl.append('id', this.id$);
            pl.append('title', formVal.title);
            pl.append('description', formVal.description);
            pl.append('isPublic', this.isPublic$ ? '1' : '0');
            pl.append('photo', this.profileImgFile || this.getData.photo);
            pl.append('steps', JSON.stringify(formVal.steps));

            this.tipService.update(pl).subscribe({
                next:((res:any) => {
                    this.spinnerService.loading.next(false);
                    
                    this.goToList();
    
                    this.toastService.showToast({
                        icon:'../../../../../assets/images/general/check-bg-green.svg',
                        title:'Updated Tip',
                        description:'you have been successfully updated tip.'
                    });
                }),
                error: (err => {
                    this.spinnerService.loading.next(false);
    
                    this.dialogMService.showError(err);
                })
            });
        }
    }

    onCancelEdit() {
        this.goToList();
    }

    goToList() {this.router.navigate([`${RouteNames.DASHBOARD}/${RouteNames.TIPS}`]);}
}