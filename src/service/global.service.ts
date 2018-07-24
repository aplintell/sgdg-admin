import { Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalService {

  serviceHost: string = "http://localhost:8080/sgdg";
  // serviceHost: string = "/sgdg";
  userCookie: string = "ccsid";
  jsonContentTypeOption: RequestOptions;
  formTypeOpion: RequestOptions;
  fileTypeOpion: RequestOptions;
  multipartFormOption : RequestOptions;
 

  constructor() {
    this.jsonContentTypeOption = new RequestOptions({withCredentials: true,headers:  new Headers({'Content-Type': 'application/json'})});
    this.fileTypeOpion = new RequestOptions({headers:  new Headers({'Content-Type': 'application/json',
                                                                    'enctype': 'multipart/form-data',
                                                                    'processData': false,
                                                                    'contentType': false,
                                                                    'cache': false,
                                                                    'timeout': 600000})});
    this.formTypeOpion = new RequestOptions({withCredentials: true, headers:  new Headers({'Content-Type': 'application/x-www-form-urlencoded'})});
    this.multipartFormOption = new RequestOptions({withCredentials: true});
  
    
  }

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

}
