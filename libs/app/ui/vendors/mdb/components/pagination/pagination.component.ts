import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageType, TablePagination } from "@movit/app/common";

@Component({
  selector: 'mdb-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class MdbPaginationComponent {
  @Input()
  paginate: TablePagination;

  @Output()
  onPageChange: EventEmitter<number> = new EventEmitter<number>();

  PageType = PageType;

  nextPage() {
    if (this.paginate.currentPage < this.paginate.total) {
      this.onPageChange.emit(this.paginate.currentPage++);
    }
  }

  previousPage() {
    if (this.paginate.currentPage > 1) {
      this.onPageChange.emit(this.paginate.currentPage--);
    }
  }

  goToPage(page: number) {
    this.paginate.currentPage = page;
    this.onPageChange.emit(this.paginate.currentPage);
  }
}
