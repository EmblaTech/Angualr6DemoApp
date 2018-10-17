import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable } from 'rxjs';

import { map,tap,catchError } from 'rxjs/operators';
import { Environment } from 'src/app/models/environment.model';
import { DataContextService } from '../data-context/data-context.service';

@Injectable()
export class AppJsonService {

  private _env: Environment;
  private _subscription;

  constructor(private http: Http, private dataContext: DataContextService) {
    this._subscription = this.http.get('./environments/app.json')
      .pipe(map((response: Response) => <Environment> response.json()))
      .pipe(tap(env => this.dataContext.environment = env))
      //.pipe(catchError(error => this.handleError(error, this.router)))
      .pipe(catchError(error => this._handleError(error)))
      //.share<Environment>()
    ;
  }

  load(): Observable<Environment> {
    return this._subscription;
  }
  private _handleError(error: Response) {
    return Observable.throw(error || 'Server error');
  }
}

