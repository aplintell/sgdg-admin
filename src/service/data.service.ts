import { GlobalService } from './global.service';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, BaseRequestOptions } from '@angular/http';

@Injectable()
export class DataService {

  constructor(private url: string, private http: Http, private globalService: GlobalService) { }

  save(resource) {
    return this.http.post(this.globalService.serviceHost + this.url + "save", JSON.stringify(resource), this.globalService.jsonContentTypeOption);
  }

  delete(id) {
    return this.http.post(this.globalService.serviceHost + this.url + "delete/" + id, null, this.globalService.formTypeOpion);
  }

  get(id) {
    return this.http.post(this.globalService.serviceHost + this.url + id, null, this.globalService.formTypeOpion);
  }

  search(searchParams, page) {
    return this.http.post(this.globalService.serviceHost + this.url + "search?" + searchParams + "&page=" + page, null, this.globalService.formTypeOpion);
  }
}
