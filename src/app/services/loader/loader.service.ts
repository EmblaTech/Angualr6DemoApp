import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class LoaderService {
    
    private subject = new Subject<boolean>();

    setLoading(message: boolean) {
        this.subject.next(message);
    }

    clearMessage() {
        this.subject.next();
    }

    isLoading(): Observable<boolean> {
        return this.subject.asObservable();
    }

}
