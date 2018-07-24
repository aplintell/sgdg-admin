import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Http, URLSearchParams, Headers } from '@angular/http';

@Injectable()
export class LoginService {

  constructor(private globalService: GlobalService, private http:Http) { }

  login(loginId:string, password:string){
    let params = new URLSearchParams();
    params.set('loginId', loginId);
    params.set('password', password);
    return this.http.post(this.globalService.serviceHost +"/user/login", params,this.globalService.formTypeOpion);
  }
}
