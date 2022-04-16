import { BehaviorSubject } from 'rxjs';

interface IPageInfo {
  prevPage: boolean;
  nextPage: number;
  currentPage: number;

  total: number;
  perPage: number;
}

class TablePagination {
  pages: number[] = [];

  getPages(infos: IPageInfo): number[] {
    let pageNum: any = Array.apply(
        null,
        Array(Math.min(Math.round(infos.total / infos.perPage) || 0, 10))
    );

    if (infos.currentPage > 10) {
      const factor: number = 10 * Math.floor(infos.currentPage / 10);
      pageNum = pageNum.map((s: any, i: number) => factor + i);
    } else pageNum = pageNum.map((s: any, i: number) => 1 + i);

    return pageNum;
  }
}

export interface ITableOptions<T> extends IPageInfo {
  data: T[];
}

export interface ITableBaseFilter {
  page?: number;
  searchValue: string;
}

export class Table<T, F extends ITableBaseFilter> {
  constructor(
      public data$: BehaviorSubject<ITableOptions<T>>,
      public filterValues: F = <F>{}
  ) {}
  readonly paginate = new TablePagination();

  public canShow(obj: any, keys: string[] = []): boolean {
    const value: string = this.filterValues.searchValue;
    if (!value) return true;

    if (keys.length == 0) {
      for (const value in obj) {
        if (
            value !== 'avatar' &&
            value !== 'img' &&
            value !== 'src' &&
            value !== 'url' &&
            value !== 'link' &&
            (obj[value] + '').toLowerCase().includes(value.toLowerCase())
        ) {
          return true;
        }
      }
    }

    for (const key of keys) {
      if (obj[key] && obj[key].toLowerCase().includes(value?.toLowerCase())) {
        return true;
      }
    }

    return false;
  }

  getPagesNum(pageResultInfos: IPageInfo) {
    return this.paginate.getPages(pageResultInfos);
  }

  static create<T, F extends ITableBaseFilter>(
      observer: BehaviorSubject<ITableOptions<T>>,
      filterValues: F
  ) {
    return new Table<T, F>(observer, filterValues);
  }

  destroy() {
    this.data$.unsubscribe();
  }
}
