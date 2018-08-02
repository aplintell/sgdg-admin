import { DataService } from './data.service';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { User } from '../entity/User';

@Injectable()
export class UserService extends DataService {

  constructor( globalService: GlobalService, http: Http) {
    super("/user/", http, globalService);
  }

  toggleStatus(id) {
    return this.http.post(this.globalService.serviceHost + "/user/toggleStatus/" + id, null, this.globalService.formTypeOpion);
  }
}
