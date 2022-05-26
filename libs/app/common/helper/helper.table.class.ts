import { BehaviorSubject } from 'rxjs';
import { HttpParams } from '@angular/common/http';

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
      pageNum = pageNum.map((s: number, i: number) => factor + i);
    } else pageNum = pageNum.map((s: number, i: number) => 1 + i);

    return pageNum;
  }
}

export interface ITableOptions<T> extends IPageInfo {
  data: T[];
}

export interface ITableBaseFilter {
  page?: number;
  searchValue?: string;
  keys?: string[];
  customSearch?: { [key: string]: string; }
}

export class Table<Type, Filter extends ITableBaseFilter> {
  /*
   * Pagination Hanlder
   * */
  readonly paginate = new TablePagination();

  private readonly fields: (keyof Type)[] = [];

  constructor(
    public data$: BehaviorSubject<ITableOptions<Type>>,
    public filterValues: Filter = <Filter>{}
  ) {}

  public canShow(
    obj: any,
    keys: string[] = this.filterValues.keys || []
  ): boolean {
    const value: string = this.filterValues.searchValue || '';
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

  public getPagesNum(pageResultInfos: IPageInfo) {
    return this.paginate.getPages(pageResultInfos);
  }

  static create<T, F extends ITableBaseFilter>(
    observer: BehaviorSubject<ITableOptions<T>>,
    filterValues: F
  ) {
    return new Table<T, F>(observer, filterValues);
  }

  get eachKeyField(): (keyof Type)[] {
    return this.fields;
  }

  // todo comment
  destroy() {
    this.data$.unsubscribe();
  }

  setFields(fields: (keyof Type)[]) {
    this.fields.length = 0;
    this.fields.push(...fields);
    return this;
  }

  private getSearchTerms():string {
    if(Object.keys(this.filterValues.customSearch || {})?.length){
      this.filterValues.searchValue = '';
      for(const key in this.filterValues.customSearch){
        if(this.filterValues.customSearch[key]) this.filterValues.searchValue += `${key}:${this.filterValues.customSearch[key]?.toLowerCase().trim()}`;
      }
    }else if(this.filterValues.keys?.length) {
      const result = []
      for(const key of this.filterValues.keys){
        result.push(`${key}:${this.filterValues.searchValue?.toLowerCase().trim()}`);
      }
      return  result.join(',')
    }

    return this.filterValues.searchValue || '';
  }

  public getFilterValuesAsHttpParams() {
    let queryParams = new HttpParams();
    const searchTerm = this.getSearchTerms();
    for (const key in this.filterValues) {
      if (key
          && !key.includes('customSearch')
          && !key.includes('_')){
        queryParams =
            key === 'searchValue' ?
              queryParams.append(key, searchTerm) :
               queryParams.append(key, <any>this.filterValues[key]);
      }

    }
    return queryParams;
  }
}
