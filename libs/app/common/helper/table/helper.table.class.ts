import {BehaviorSubject, Subject, takeUntil} from 'rxjs';
import { HttpParams } from '@angular/common/http';
import {ITablePaginationInfo, TablePagination} from "./helper.table.pagination.class";
import {ITableBaseFilter} from "./helper.table.filter.class";

export interface ITableOptions<T> extends ITablePaginationInfo {
  data: T[];
}


export class Table<Type, Filter extends ITableBaseFilter> {

  /*
   * Pagination Helper
   * */
  readonly pagination = new TablePagination();

  private readonly fields: (keyof Type)[] = [];

  private onDispose = new Subject<void>();

  constructor(
    public data$: BehaviorSubject<ITableOptions<Type>>,
    public filterValues: Filter = <Filter>{}
  ) {

  }

  public mapPagination(paginate:any){
    this.pagination.initPages( paginate.total, paginate.count, paginate.page);
  }

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

  static create<T, F extends ITableBaseFilter>(
    observer: BehaviorSubject<ITableOptions<T>>,
    filterValues: F
  ) {
    return new Table<T, F>(observer, filterValues);
  }

  get eachKeyField(): (keyof Type)[] {
    return this.fields;
  }

  setFields(fields: (keyof Type)[]) {
    this.fields.length = 0;
    this.fields.push(...fields);
    return this;
  }


  //todo move this to filter & search
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

  public getFilterValuesAsHttpParams():HttpParams {
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

  public getFilterValuesAndPaginationAsHttpParams():HttpParams{
    let queryParams = this.getFilterValuesAsHttpParams();
    queryParams = queryParams.append('page',(this.pagination.currentPage || 0).toString())
    queryParams = queryParams.set('limit',(this.pagination.perPage || 10 ).toString());
    return queryParams
  }

  // todo comment
  destroy() {
    this.onDispose.complete();
    this.data$.unsubscribe();
  }
}
