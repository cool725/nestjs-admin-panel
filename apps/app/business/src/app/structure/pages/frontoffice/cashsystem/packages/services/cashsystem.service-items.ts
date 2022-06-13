import {Injectable, NgModule} from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../../../environments/environment";

@Injectable()
export class CashSystemItemsService {

  services$:BehaviorSubject<any[]> = new BehaviorSubject([])

  basePath = '/frontoffice/cashsystem/'

  constructor(private http:HttpClient) {
    // test
    this.getServices().subscribe()
  }

  private getPath(path:string, subPath?:string | number){
    return environment.api.url + this.basePath + path + (subPath ? ('/'+subPath) : '')
  }

  public getServices(){
    return this.http.get<any[]>(this.getPath('items/services'))
  }

  saveSettings(){

  }
}
