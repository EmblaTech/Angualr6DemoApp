import { Injectable, Injector, ErrorHandler} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpErrorResponse  } from '@angular/common/http';
import {Observable,of, from } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter,catchError } from 'rxjs/operators';
import { DataContextService } from '../services/index.services';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private dataContext: DataContextService,private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log('Intercept : '+req.url);
        if(this.dataContext.token!=undefined){
             req = req.clone({ setHeaders: { 'Authorization': `token ${this.dataContext.token}` } });
        }

        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((e) => {
            this.dataContext.navigatedFrom = e[0]['url'];
            this.dataContext.navigatedTo = e[1]['url'];
        });

        return next.handle(req).pipe(catchError(response => {
            if (response instanceof HttpErrorResponse) { //if error has thrown
                //console.log('Processing http error', response);
                if (response.status == 403 || 
                    response.status == 401 || 
                    response.url.toString().indexOf('/mbeProjects') != -1 || 
                    response.url.toString().indexOf('/mbeusers') != -1 || 
                    response.url.toString().indexOf('/mbeHeaders/') != -1) {
                    //this.webStorageService.clearAll();
                    this.dataContext.token = undefined;
                    this.router.navigate([""]);
                }
            }

            return Observable.throw(response);
      }));
    }
}
