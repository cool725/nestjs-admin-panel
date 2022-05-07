import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { AppApiBase } from "@movit/app/common";
import { Cacheable } from "angular-cacheable";

interface User{}

@Injectable({providedIn:'root'})
export class UserAPI {

  baseUrl:string = 'http://localhost:3003/api/user';

  constructor(protected http: HttpClient) {}

  protected getPath(endPoint:string):string {
    return [this.baseUrl,endPoint].join('/');
  }

  public me(){
   return this.http.get(this.getPath('me'));
  }
}
