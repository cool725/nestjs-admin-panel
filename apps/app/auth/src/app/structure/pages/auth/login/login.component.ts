import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../packages/auth.api';
import { catchError, of, Subscription, tap } from 'rxjs';
import { AppNotifyService } from '@movit/app/common';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy, OnInit {
  loginForm = this.fb.group({
    email: new FormControl(
      sessionStorage.getItem('email') || environment.production
        ? ''
        : 'demo@movit.ch',
      [Validators.required, Validators.email]
    ),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  subscriptions: Subscription[] = [];

  companies: any = [];

  constructor(

    @Inject('uuId') private uuId: string,
    @Inject('redirectByRouter') private redirectByRouter: boolean,
    @Inject(DOCUMENT) private document: Document,

    public route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    protected notify: AppNotifyService
  ) {}

  ngOnInit() {
    if (location.href.includes('signoff')) {
      this.signOff();
    }
    if (document.cookie.includes('utk')) {
      this.getCompanies();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  submit() {
    if (!this.loginForm.valid) {
      return console.log(' Felder ungültig.');
    }

    return this.authService
      .signIn({
        ...this.loginForm.value,
        uuId: this.getDeviceId(),
      })
      .pipe(
        tap((result) =>
          result && result.accessToken
            ? this.onSuccess(result)
            : this.onFailure()
        ),
        catchError(() => of(this.onFailure()))
      )
      .subscribe();
  }

  onSuccess({
    accessToken,
    accessCompanyToken,
    company,
  }: {
    accessCompanyToken: string;
    accessToken: string;
    user: { id: string };
    company: { id: string };
  }) {
    if (!environment.production) {
      this.setCookie('utk', accessToken, 365);
      this.setCookie('ctk', accessCompanyToken, 365);
      this.setCookie('uuId', this.getDeviceId(), 365);
    }

    this.storeCompanySession(company);

    if(sessionStorage.getItem('debug'))return console.log('debug mode')

    if (accessCompanyToken) {
      this.doRedirect({
        redirect: 'business',
        accessToken,
        accessCompanyToken,
        company,
        uuid: this.getDeviceId(),
      });
    } else {
      /*Create new company or as for assing*/
      this.notify.show('warning', {
        title: 'Firma',
        text: 'Keine Berechtigungen gefunden',
      });
    }

    return { accessToken, accessCompanyToken, company };
  }

  onFailure() {
    this.notify.show('error', 'Login Daten nicht korrekt');
    return false;
  }

  signOff() {
    this.authService
      .signOut()
      .pipe(tap(() => this.setCookie('utk', '', 0)))
      .subscribe();
  }

  getDeviceId() {
    return this.uuId;
  }

  setCookie(cname: string, cvalue: string, exdays: number = 0) {
    let hostName = this.document.location.hostname;
    hostName = hostName.replace('auth', '');

    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString() + ';';

    this.document.cookie =
      cname + '=' + cvalue + ';' + expires + 'domain=' + hostName + ';path=/';
  }

  storeCompanySession(company: any) {
    environment.session.company = company;
  }

  getCompanies(force: boolean = false, params = {}) {
    return this.authService
      .getCompanies(force, params)
      .then((results) => (results ? (this.companies = results) : null));
  }

  signInToCompany({ businessUuId }: any) {
    return this.authService.signInToCompany(businessUuId).then((result) => {
      this.setCookie('ctk', result.accessToken, 365);
      this.doRedirect({ ...result, uuid: businessUuId, redirect: 'business' });
    });
  }

  doRedirect(data: any) {

    if(this.redirectByRouter){
      this.router.navigate(['/']);
    }
    else {
      if (data.redirect === 'business') {
        if (!data.uuid) location.href = environment.auth.redirectToBusiness;

        const baseUrl = location.host.split('.');
        baseUrl.shift();
        window.open(
          location.protocol +
          '//business.' +
          baseUrl.join('.') +
          '/' +
          data.uuid +
          '/1',
          '_self'
        );
      }
      if (data.redirect === 'partner') {
        location.href = environment.auth.redirectToPartner;
      }
    }
  }
}
