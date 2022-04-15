import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Cacheable } from 'angular-cacheable';

@Injectable()
export class FinanceAPI {
  baseUrl = environment.api.url;

  constructor(private http: HttpClient) {}

  private getBaseUrl(path: string) {
    return this.baseUrl + path;
  }

  @Cacheable({
    ttl: environment.api.defaultCacheTtl,
    key: (args: any[]) => {
      return environment.company.id + '-' + JSON.stringify(args); // args[0] is the first method argument. Here it is `page`.
    },
  })
  getAccounts() {
    return this.http.get<any>(this.getBaseUrl('/finance/getAccounts'));
  }

  // todo rename
  @Cacheable({
    ttl: environment.api.defaultCacheTtl,
    key: (args: any[]) => {
      return environment.company.id + '-' + JSON.stringify(args); // args[0] is the first method argument. Here it is `page`.
    },
  })
  getTAccounts() {
    return this.http.get(this.getBaseUrl('/finance/getTAccounts'));
  }

  getTransactions(
    parameters: { accountName?: boolean; accountParentName?: boolean } = {}
  ) {
    return this.http.get<any>(this.getBaseUrl('/finance/getTransactions'), {
      params: parameters,
    });
  }

  setTransactions(parameters: { transactions: any[] }) {
    return this.http.post<any>(
      this.getBaseUrl('/finance/saveTransactions'),
      parameters
    );
  }
}
