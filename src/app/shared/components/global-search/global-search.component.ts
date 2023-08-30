import { Component } from "@angular/core";

import { GlobalSearchSubjectService } from "src/app/core/utils";

@Component({
    selector:'htc-global-search',
    templateUrl:'./global-search.component.html'
})
export class HTCGlobalSearchComponent {
    
    constructor(private globalSearchService:GlobalSearchSubjectService) {}

    onSearch(evt:any) {
        if(evt.keyCode === 46 || evt.target.value.length===0) {
            this.globalSearchService.search.next(null);
            
        } else if(evt && evt.target && evt.target.value.trim()) {
            this.globalSearchService.search.next(evt.target.value);
        }
    }
}