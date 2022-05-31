export interface ITablePaginationInfo {
  prevPage: boolean;
  nextPage: number;
  currentPage: number;

  total: number;
  perPage: number;
}

export class TablePagination implements ITablePaginationInfo{


  prevPage: boolean;

  nextPage: number;

  currentPage: number;

  total: number;

  perPage: number;

  get numberOfTotalPages (): number {
    return Math.ceil(this.total / this.perPage)
  }

  get pages(){
    // Array.from({ length: this.paginate.total }, (_, i) => i + 1)
    return [1,2]
  }
}