import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationObj } from './pagination.interface';

@Component({
  selector: 'mdb-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class MdbPaginationComponent implements OnInit {
  @Input()
  paginate: PaginationObj;

  @Output()
  pageChange: EventEmitter<number> = new EventEmitter<number>();

  currentPage = 1;
  pages: number[];

  ngOnInit(): void {
    this.currentPage = this.paginate.page;
    this.pages = Array.from({ length: this.paginate.count }, (_, i) => i + 1);
  }

  nextPage() {
    if (this.currentPage < this.paginate.count) {
      this.currentPage += 1;
      this.pageChange.emit(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }
}
