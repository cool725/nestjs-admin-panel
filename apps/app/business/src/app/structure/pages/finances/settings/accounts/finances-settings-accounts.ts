import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cacheable } from 'angular-cacheable';
import {environment} from "../../../../../../environments/environment";

@Injectable()
export class FinancesSettingsAccountsAPI {
  baseUrl = environment.api.url;

  constructor(

      private http: HttpClient) {}

  private getBaseUrl(path: string) {
    return this.baseUrl + path;
  }


  getAccounts() {
    return this.http.get<any>(this.getBaseUrl('/finances/settings/accounts'));
  }

  updateAccount(account) {
    return this.http.patch(this.getBaseUrl('/finances/settings/accounts/'+account.accountId),account);
  }

}
