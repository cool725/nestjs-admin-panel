export interface ITablePaginationInfo {
  prevPage: boolean;
  nextPage: number;
  currentPage: number;
  total: number;
  perPage: number;
}

export enum PageType {
  NUMBER,
  DOTS,
}

export class TablePagination implements ITablePaginationInfo {
  prevPage: boolean;

  nextPage: number;

  currentPage: number;

  total: number;

  perPage: number;

  numberOfTotalPages: number;

  pages: {
    type: PageType;
    value: number;
  }[];

  readonly adjacent = 2;

  initPages(total: number, perPage: number, page: number) {
    this.total = total;
    if (!this.perPage) {
      this.perPage = perPage;
    }
    this.currentPage = Math.floor(page / this.perPage) + 1;
    this.numberOfTotalPages = Math.ceil(this.total / this.perPage);
    this.generatePages();
  }

  private generatePages() {
    this.pages = [];
    const fullAdjacentSize = this.adjacent * 2 + 2;
    if (this.numberOfTotalPages <= fullAdjacentSize + 2) {
      this.addRange(1, this.numberOfTotalPages);
    } else {
      let start, finish;
      if (this.currentPage - this.adjacent <= 2) {
        start = 1;
        finish = 1 + fullAdjacentSize;

        this.addRange(start, finish);
        this.addLast(this.numberOfTotalPages, finish);
      } else if (
        this.currentPage <
        this.numberOfTotalPages - (this.adjacent + 2)
      ) {
        start = this.currentPage - this.adjacent;
        finish = this.currentPage + this.adjacent;

        this.addFirst(start);
        this.addRange(start, finish);
        this.addLast(this.numberOfTotalPages, finish);
      } else {
        start = this.numberOfTotalPages - fullAdjacentSize;
        finish = this.numberOfTotalPages;

        this.addFirst(start);
        this.addRange(start, finish);
      }
    }
  }

  private addRange(start: number, finish: number) {
    for (let i = start; i <= finish; i++) {
      this.pages = this.pages.concat({
        type: PageType.NUMBER,
        value: i,
      });
    }
  }

  private addFirst(next: number) {
    this.addRange(1, this.adjacent);
    if (next != this.adjacent + 1) {
      this.addDots();
    }
  }

  private addLast(pageCount: number, prev: number) {
    if (prev != pageCount - (this.adjacent - 1)) {
      this.addDots();
    }

    this.addRange(pageCount - (this.adjacent - 1), pageCount);
  }

  private addDots() {
    this.pages = [
      ...this.pages,
      {
        type: PageType.DOTS,
        value: undefined,
      },
    ];
  }
}
