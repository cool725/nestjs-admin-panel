import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private urlBase = environment.api.url + '/auth/';
  private sessionValid = false;

  constructor(private router: Router, private http: HttpClient) {
    this.onInit();
  }

  static getDeviceId() {
    return (<any>window).getDeviceId();
  }

  public register<TUser>(userInfos: TUser, creds: any): Observable<any> {
    return this.http.post(this.urlBase + 'signup', {
      ...userInfos,
      ...creds,
      domain: location.origin,
    });
  }

  public signIn(creds: any): Observable<any> {
    return this.http.post(this.urlBase + 'signin', creds);
  }
  public signInToCompany(companyId: any): Promise<any> {
    return this.http
      .post(this.urlBase + 'signin-company/' + companyId, {})
      .toPromise();
  }
  public signOut(): Observable<any> {
    return this.http.post(this.urlBase + 'signout', {});
  }

  public verifySession<S = any>(): Observable<{
    valid: boolean;
    company: any;
  }> {
    return this.http
      .post<S>(this.urlBase + 'session', {
        uuId: AuthService.getDeviceId(),
      })
      .pipe(tap((data: any) => (this.sessionValid = data && data.valid)));
  }

  public verifyEmail(email: string, token: any): Observable<any> {
    return this.http.post(this.urlBase + 'verify-email', { token, email });
  }

  public forgotPassword(creds: any): Observable<any> {
    return this.http.post(this.urlBase + 'pass-forgot', {
      ...creds,
      domain: location.origin,
    });
  }

  public verifyPasswordResetLink(options: {
    email: string;
    code: string;
  }): Observable<any> {
    return this.http.post(this.urlBase + 'pass-verify-code', options);
  }

  public resetPassword(creds: any) {
    return this.http.post(this.urlBase + 'pass-update', {
      code: creds.code,
      ...creds,
    });
  }

  private onInit() {
    // verify session
  }

  /*
   * List all current Tentant/Companies that user has access to
   * User must be logged in to use this function or use force = true
   * @autoLogin boolean assings user to a company
   * * */
  async getCompanies<C>(
    force: boolean = false,
    params: { autoLogin?: boolean } = {}
  ) {
    const sessionIsValid = async () =>
      force ||
      this.sessionValid ||
      ((await this.verifySession()) && this.sessionValid);

    if (await sessionIsValid()) {
      let queryParams = '';

      if (params && params.autoLogin) {
        queryParams = '?autoLogin=1';
      }

      return this.http.get<C[]>(
        environment.api.url + '/business/list' + queryParams
      ).toPromise();
    }

    return []
  }

  public removeTestUser(email: string, password: string): Observable<any> {
    return this.http.delete(
      this.urlBase + 'removeTestUser/' + email + '/' + password
    );
  }
}
