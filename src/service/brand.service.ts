import { Brand } from './../entity/Brand';
import { DataService } from './data.service';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { User } from '../entity/User';

@Injectable()
export class BrandService {

  constructor(private globalService: GlobalService, private http: Http) {
  }

  save(brand) {
    let formData = new FormData();
    formData.append('brandId', brand.brandId == null ? 0: brand.brandId);
    formData.append('name', brand.name);
    formData.append('priority', brand.priority);
    formData.append('status',brand.status);
    formData.append('image', brand.image);
    return this.http
      .post(this.globalService.serviceHost + "/brand/save", formData, this.globalService.multipartFormOption);
  }

  search(searchParams, page) {
    return this.http.post(this.globalService.serviceHost + "/brand/search?" + searchParams + "&page=" + page, null, this.globalService.formTypeOpion);
  }

  delete(id) {
    return this.http.post(this.globalService.serviceHost + "/brand/delete/" + id, null, this.globalService.formTypeOpion);
  }

  get(id) {
    return this.http.post(this.globalService.serviceHost + "/brand/" + id, null, this.globalService.formTypeOpion);
  }

}
