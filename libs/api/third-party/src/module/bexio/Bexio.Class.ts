// import the module
import Bexio1 from 'bexio';
import BaseCrud from 'bexio/lib/resources/BaseCrud';

const cloneInstance = (bexio: any) =>
  Object.assign(Object.create(Object.getPrototypeOf(bexio.users)), bexio.users);

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace BexioHelper {
  export class Bexio {
    public bexioApi: Bexio1;

    readonly accounts: BexioAccounts = new BexioAccounts(this);
    readonly taxes: BexioTaxes = new BexioTaxes(this);

    constructor(token: string) {
      this.bexioApi = new Bexio1(token);
    }

    public getCustomAPI(): BaseCrud<any, any, any, any, any, any> {
      return cloneInstance(this.bexioApi);
    }
  }

  class BexioAccounts {
    constructor(protected bexio: Bexio) {}

    public getAccountCategories() {
      const accountCatAPI = this.getCustomAPI();
      accountCatAPI['apiEndpoint'] = '/account_groups ';
      accountCatAPI['baseApiUrl'] = 'https://api.bexio.com/2.0';
      return accountCatAPI.list();
    }

    public getAccounts() {
      const accountAPI = this.getCustomAPI();
      accountAPI['apiEndpoint'] = '/accounts ';
      accountAPI['baseApiUrl'] = 'https://api.bexio.com/2.0';
      return accountAPI.list();
    }

    protected getCustomAPI() {
      return this.bexio.getCustomAPI();
    }
  }

  class BexioTaxes {
    constructor(protected bexio: Bexio) {}

    public getTaxes() {
      const api = this.getCustomAPI();
      api['apiEndpoint'] = '/taxes  ';
      api['baseApiUrl'] = 'https://api.bexio.com/3.0';
      return api.list();
    }

    protected getCustomAPI() {
      return this.bexio.getCustomAPI();
    }
  }
}
