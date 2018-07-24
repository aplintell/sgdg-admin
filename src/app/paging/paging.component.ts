import { Component, OnInit } from '@angular/core';
import { PagingService } from '../../service/paging.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  currentPage: number;
  totalPage: number;
  pages: [number];
  numRecordPerPage: number;
  totalRecord: number;

  constructor(private pagingService: PagingService, private translate: TranslateService) {
    this.pagingService.currentPage.subscribe(curPage => { this.currentPage = curPage });
    this.pagingService.totalPage.subscribe(ttPage => { this.totalPage = ttPage });
    this.pagingService.numRecordPerPage.subscribe(numRecordPerPage => { this.numRecordPerPage = numRecordPerPage });
    this.pagingService.totalRecord.subscribe(totalRecord => { this.totalRecord = totalRecord });
    this.pagingService.pages.subscribe(pages => { this.pages = pages });
  }

  ngOnInit() {
  }

  change(page: number) {
    this.pagingService.changePage(page);
  }

}
