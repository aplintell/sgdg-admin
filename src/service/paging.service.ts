import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PagingService {

  private currentPageSource = new BehaviorSubject<number>(0);
  private numRecordPerPageSource = new BehaviorSubject<number>(10);
  private totalPageSource = new BehaviorSubject<number>(0);
  private totalRecordSource = new BehaviorSubject<number>(0);
  private pagesSource = new BehaviorSubject<any>([]);

  currentPage = this.currentPageSource.asObservable();
  totalPage = this.totalPageSource.asObservable();
  pages = this.pagesSource.asObservable();
  numRecordPerPage = this.numRecordPerPageSource.asObservable();
  totalRecord = this.totalRecordSource.asObservable();

  constructor() {
  }

  setPagingInfo(currentPage: number, totalPage: number, totalRecord:number) {
    this.currentPageSource.next(currentPage);
    this.totalPageSource.next(totalPage);
    this.totalRecordSource.next(totalRecord);
    this.pagesSource.next(Array(this.totalPageSource.getValue()).fill(0).map((x, i) => i + 1));
  }

  changePage(page: number) {
    this.currentPageSource.next(page);
  }

}
