import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {}

@Injectable({ providedIn: 'root' })
export class UserAPI {
  baseUrl: string = 'http://localhost:3003/api/user';

  constructor(protected http: HttpClient) {}

  protected getPath(endPoint: string): string {
    return [this.baseUrl, endPoint].join('/');
  }

  public me() {
    return this.http.get(this.getPath('me'));
  }
}
