//SOME IDEA ON GENERIC HTTP
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class OpdHttpService {

  private baseUrl: string;
  headers: HttpHeaders;

  onUnAuthorizedError : EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { 
    this.baseUrl = "http:Management-API";
    this.headers = new HttpHeaders();
  }

  public sendObject<T> (path: string, object: T, successCallback:(data:T)=>void, errorCallback:()=>void)  {
    return this.http.post(this.baseUrl+path, object)
    .subscribe(data => {
      successCallback(data as T);
    }, err=>{
      this.handleErrors(err);     
      errorCallback();
    });               
  }  

  public sendObjectAuthorized<T> (path: string, object: T, successCallback:(data:T)=>void, errorCallback:()=>void)  {
    return this.http.post(this.baseUrl+path, object, {headers: this.headers})
    .subscribe(data => {
      successCallback(data as T);
    }, err=>{
      this.handleErrors(err);     
      errorCallback();
    })   ;               
  }  


  public getObjectsAuthorized<T> (path: string, successCallback:(data:T[])=>void, errorCallback:()=>void)  {
    return this.http.get(this.baseUrl+path, {headers: this.headers})
    .subscribe(data => {
      successCallback(data as T[]);
    }, err=>{
      this.handleErrors(err);       
      errorCallback();
    })   ;               
  }   

 
  
  setToken(token:string){
    this.headers = new HttpHeaders({"Authorization":"Bearer "+token});
  }

  handleErrors(er){
    console.log(er);   
    if(er.status == 401){
      console.log("Unauthorzied");
      
      this.onUnAuthorizedError.emit();
    }
  }
}
