import { Injectable } from '@angular/core';
import { Environment } from 'src/app/models/environment.model';

@Injectable({
  providedIn: 'root'
})
export class DataContextService {
    public loggedIn: boolean = false;
    public token: string;
    public navigatedFrom: any;
    public navigatedTo: any;
    //public user: User;

    get environment(): Environment {
      try {
          const val = localStorage.getItem("mgt_environment");
          return (val) ? JSON.parse(val) : {};
      } catch (err) {
          return null;
      }
  }
  set environment(env: Environment) {
      localStorage.setItem('mgt_environment', JSON.stringify(env));
  }
}
