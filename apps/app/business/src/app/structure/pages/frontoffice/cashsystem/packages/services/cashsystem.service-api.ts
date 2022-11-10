import { Injectable, NgModule } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../../../environments/environment";
import { ICashSystemSettings } from "../interfaces/cashsystem.interface";

@Injectable()
export class CashSystemService {
  basePath = "/frontoffice/cashsystem/";
  constructor(private http: HttpClient) {}

  private getPath(path: string, subPath?: string | number) {
    return environment.api.url + this.basePath + path + (subPath ? "/" + subPath : "");
  }
  public signInToCashSystem() {
    return this.http.get(this.getPath("settings/signin"));
  }

  public getSettings(systemId?: number | string) {
    return this.http.get<ICashSystemSettings>(this.getPath("settings/settings", systemId || ""));
  }

  public getAccounts() {
    return this.http.get<any[]>(this.getPath("accounts"));
  }

  public cashout(basektInfos) {
    return this.http.post<any[]>(this.getPath("cashout"), basektInfos);
  }
}
