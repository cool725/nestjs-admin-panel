export interface ITablePaginationInfo {
  prevPage: boolean;
  nextPage: number;
  currentPage: number;
  total: number;
  perPage: number;
}

export class TablePagination implements ITablePaginationInfo {
  prevPage: boolean;

  nextPage: number;

  currentPage: number;

  total: number;

  perPage: number;

  numberOfTotalPages: number;

  pages: number[];

  initPages(total: number, perPage: number, page: number) {
    this.total = total;
    if (!this.perPage) {
      this.perPage = perPage;
    }
    this.currentPage = Math.floor(page / this.perPage) + 1;
    this.numberOfTotalPages = Math.ceil(this.total / this.perPage);
    this.pages = Array.from({ length: this.numberOfTotalPages ?? 0 }, (_, i) => i + 1);
  }
}