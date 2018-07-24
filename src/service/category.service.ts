import { DataService } from './data.service';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { User } from '../entity/User';

@Injectable()
export class CategoryService extends DataService {

  constructor( globalService: GlobalService, http: Http) {
    super("/category/", http, globalService);
  }

}
