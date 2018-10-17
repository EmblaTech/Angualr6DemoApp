import { Injectable } from '@angular/core';
import { HttpService } from '../index.services';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpService:HttpService) { }

  login(){
    return this.httpService.getObject('login');
  }
}
