import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router'
// import { LoginService } from '../login/login.service';
// import { DataContext } from '../data-context/data-context';
// import { WebStorageService } from '../web-storage/web-storage.service';
import { LoaderService } from '../loader/loader.service';
import { HttpClient } from "@angular/common/http";
import { catchError,finalize  } from 'rxjs/operators';
import { DataContextService } from '../data-context/data-context.service';
import { AppJsonService } from '../app-json/app-json.service';

@Injectable()
export class HttpService {

	public BASE_URL_READ_ONLY;

	private baseUrl: string;
	private totalRequests: number = 0;

	constructor(private http: HttpClient,
		private router: Router,
		private dataContext: DataContextService,
		private loaderService: LoaderService,
		private appJsonService: AppJsonService
	) {
		if (this.dataContext.environment) this._setEndpoint();
		appJsonService.load().subscribe(() => this._setEndpoint())
	}

	private _setEndpoint() {
		this.baseUrl = this.dataContext.environment.base_url;
		this.BASE_URL_READ_ONLY = this.baseUrl;
	}

	private setObserver() {
		if (this.totalRequests == 0)
			this.loaderService.setLoading(false);
		else
			this.loaderService.setLoading(true);
	}

	private handleError(error: Response, router: Router) {
		return Observable.throw(error || 'Server error');
	}

	private onFinally(): void {
		this._afterRequest();
	}

	public onRequestsFinish = () => this._afterRequest();

	private _afterRequest(): void {
		this.totalRequests -= 1;
		this.setObserver();
	}

	public onRequestsStart = () => this._beforeRequest();

	private _beforeRequest(): void {
		this.totalRequests += 1;
		this.setObserver();
	}

	public getAccessToken < T > (userName: string, password: string): Observable < T > {
		var path = "token";
		var body = "grant_type=password&username=" + userName + "&password=" + password;

		var accessToken = this.http.post < T > (this.baseUrl + path, body)
			.pipe(catchError(error => this.handleError(error, this.router)))
			.pipe(finalize(() => this.onFinally()))

		return accessToken;
	}

	public getStringOutput < T > (path: string): Observable < T > {
		this._beforeRequest();
		return this.http.get < T > (this.baseUrl + path)
			.pipe(catchError(error => this.handleError(error, this.router)))
			.pipe(finalize(() => this.onFinally()));
	}

	public getObjects < T > (path: string): Observable<T[]> {
		this._beforeRequest();
		return this.http.get <T[]> (this.baseUrl + path)
			.pipe(catchError(error => this.handleError(error, this.router)))
			.pipe(finalize(() => this.onFinally()));
	}

	public getObject<T>(path: string) {
		this._beforeRequest();
		return this.http.get(this.baseUrl + path)
			.pipe(catchError(error => this.handleError(error, this.router)))
			.pipe(finalize(() => this.onFinally()));
	}

	public sendObjects < T > (path: string, object: T) {
		this._beforeRequest();
		return this.http.post < T > (this.baseUrl + path, object)
			.pipe(catchError(error => this.handleError(error, this.router)))
			.pipe(finalize(() => this.onFinally()));
	}

	public sendReceiveObject < T, U > (path: string, object: T): Observable < U > {
		this._beforeRequest();

		return this.http.post < U > (this.baseUrl + path, object)
			.pipe(catchError(error => this.handleError(error, this.router)))
			.pipe(finalize(() => this.onFinally()));
	}

	public deleteReceiveObject < U > (path: string): Observable < U > {
		this._beforeRequest();

		return this.http.delete < U > (this.baseUrl + path)
			.pipe(catchError(error => this.handleError(error, this.router)))
			.pipe(finalize(() => this.onFinally()));
	}

	public patchReceiveObject < T, U > (path: string, object: T): Observable < U > {
		this._beforeRequest();

		return this.http.patch < U > (this.baseUrl + path, object)
			.pipe(catchError(error => this.handleError(error, this.router)))
			.pipe(finalize(() => this.onFinally()));
	}

	public updateObjects < T > (path: string, object: T) {
		this._beforeRequest();
		return this.http.put < T > (this.baseUrl + path, object)
			.pipe(catchError(error => this.handleError(error, this.router)))
			.pipe(finalize(() => this.onFinally()));

	}

	public deleteObject < T > (path: string) {
		this._beforeRequest();
		return this.http.delete < T > (this.baseUrl + path)
			.pipe(catchError(error => this.handleError(error, this.router)))
			.pipe(finalize(() => this.onFinally()));
	}


	//---excel export specific requests
	public sendObjects_excel < T > (path: string, object: T) {
		this._beforeRequest();
		return this.http.post < T > (this.dataContext.environment.excel_export_url + path, object)
			.pipe(catchError(error => this.handleError(error, this.router)))
			.pipe(finalize(() => this.onFinally()));
	}

	public getObjects_excel < T > (path: string): Observable < T[] > {
		this._beforeRequest();
		return this.http.get < T[] > (this.dataContext.environment.excel_export_url + path)
			.pipe(catchError(error => this.handleError(error, this.router)))
			.pipe(finalize(() => this.onFinally()));
	}
	// ---/---
}