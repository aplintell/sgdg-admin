import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import { Me } from '../entity/me';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MeService {

  private meSource = new BehaviorSubject<Me>(null);
  me = this.meSource.asObservable();

  constructor(private globalService: GlobalService, private http:Http) {}

  getMe(){
    return this.http.post(this.globalService.serviceHost +"/user/me",new URLSearchParams(),this.globalService.formTypeOpion);
  }

  updateMe(me:Me){
    this.meSource.next(me);
  }
  
}
