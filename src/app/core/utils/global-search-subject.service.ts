import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class GlobalSearchSubjectService {
    public search = new Subject();
}