import {Injectable, NgModule} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ICashSystemSettings} from "../interfaces/cashsystem.interface";
import { HttpClient, HttpParams } from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";


@Injectable()
export class CashSystemProfileService {
  settings$:BehaviorSubject<ICashSystemSettings>
  basePath = '/frontoffice/cashsystem/profiles/'
  constructor(private http:HttpClient) {}

  private getPath(path:string, subPath?:string | number){
    return environment.api.url + this.basePath + path + (subPath ? ('/'+subPath) : '')
  }


  public searchProfiles(searchTerm){
    let httpParams = new HttpParams()
    httpParams = httpParams.append('searchTerm', `firstName:${searchTerm},lastName:${searchTerm},phone:${searchTerm},email:${searchTerm}`)
    return this.http.get<ICashSystemSettings>(this.getPath('profiles' ),{
      params:httpParams
    });

  }

  getPriceClass(){
    let httpParams = new HttpParams()
    return this.http.get<ICashSystemSettings>(this.getPath('price-class' ),{
      params:httpParams
    });
  }
}
