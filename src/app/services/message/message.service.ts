import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { Router, NavigationStart } from '@angular/router';
import { MessageType } from 'src/app/enums/message-type';

@Injectable()
export class MessageService {

    private subject = new Subject<Message>();
    private keepAfterRouteChange = false;
 
    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
 
    success(message: string, keepAfterRouteChange = false) {
        this.message(MessageType.Success, message, keepAfterRouteChange);
    }
 
    error(message: string, keepAfterRouteChange = false) {
        this.message(MessageType.Error, message, keepAfterRouteChange);
    }
 
    info(message: string, keepAfterRouteChange = false) {
        this.message(MessageType.Info, message, keepAfterRouteChange);
    }
 
    warn(message: string, keepAfterRouteChange = false) {
        this.message(MessageType.Warning, message, keepAfterRouteChange);
    }
 
    message(type: MessageType, message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next(<Message>{ type: type, message: message });
    }
 
    clear() {
        // clear alerts
        this.subject.next();
    }
}
