import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { Cacheable } from 'angular-cacheable';

@Injectable()
export class HeaderMenuAPI {
  @Input() path = '';

  readonly menu$ = new Subject<any>();

  constructor(private http: HttpClient) {}

  protected getPath(path: string) {
    return environment.api.url + this.path + path;
  }

  @Cacheable({
    ttl: environment.api.defaultCacheTtl,
    key: (args: any[]) => environment.company.id,
  })
  public getMenu() {
    return this.http.get(this.getPath('/getApps'));
  }

  public hasAccesToMenu(id: any) {
    return this.http.post(this.getPath('/hasAppAccess'), {
      id: id,
    });
  }
}
