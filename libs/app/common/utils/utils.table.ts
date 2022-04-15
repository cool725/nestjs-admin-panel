import { Subject } from 'rxjs';

export class TableHelper<T> {
  readonly values: Subject<T>;

  public filter = {
    search: '',
  };

  constructor(subject: Subject<T>) {
    this.values = subject;
  }

  public canShow(obj: any, keys: string[] = []): boolean {
    if (!this.filter.search) return true;

    if (keys.length == 0) {
      for (const value in obj) {
        if (
          value !== 'avatar' &&
          value !== 'img' &&
          value !== 'src' &&
          value !== 'url' &&
          value !== 'link' &&
          (obj[value] + '')
            .toLowerCase()
            .includes(this.filter.search.toLowerCase())
        ) {
          return true;
        }
      }
    }

    for (const key of keys) {
      if (
        obj[key] &&
        obj[key].toLowerCase().includes(this.filter.search.toLowerCase())
      ) {
        return true;
      }
    }

    return false;
  }
}
