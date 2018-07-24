import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MenuService {

  private selectedPageSource = new BehaviorSubject<string>('');

  selectedPage = this.selectedPageSource.asObservable();

  constructor() {
  }


  changePage(page: string) {
    if (page == '') {
      page = 'user';
    }
    this.selectedPageSource.next(page);
  }

}
