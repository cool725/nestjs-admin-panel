import {Inject, Injectable, Input, Optional} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { MenuItem } from "./menu.interface";


@Injectable()
export class HeaderMenuAPI {
  @Input() path = '';

  readonly menu$ = new Subject<MenuItem[]>();

  constructor(private http: HttpClient, @Inject('env') private environment: {api:{url:string}}) {}

  protected getPath(path: string) {
    return this.environment.api.url + this.path + path;
  }

  public getMenu() {
    return this.http.get(this.getPath('/getApps'));
  }

  public hasAccesToMenu(id: any) {
    return this.http.post(this.getPath('/hasAppAccess'), {
      id: id,
    });
  }
}
