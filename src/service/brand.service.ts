import { Brand } from './../entity/Brand';
import { DataService } from './data.service';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { User } from '../entity/User';

@Injectable()
export class BrandService extends DataService {

  constructor( globalService: GlobalService, http: Http) {
    super("/brand/", http, globalService);
  }

}
