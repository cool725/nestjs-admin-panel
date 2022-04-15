import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../packages/auth.api';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'auth-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
})
export class ConfirmEmailComponent implements OnInit {
  viewSettings = {
    section: {
      idx: 1,
      next() {
        this.idx++;
      },
    },
  };

  title: string;
  subTitle: string;
  submitText: string;

  // token
  key = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private ac: ActivatedRoute,
    public fb: FormBuilder
  ) {
    ac.paramMap.subscribe((pm) => {
      const mail = <any>pm.get('mail');
      this.key = <any>pm.get('key');

      if (!this.key) {
        console.warn('key not found');
        this.router.navigate(['/auth']);
        return;
      }

      this.authService.verifySession().subscribe(({ valid }) => {
        if (!valid) {
          console.log('session not valid:confirm-email');
          return this.router.navigate([
            '/auth',
            {
              path: '/auth/',
            },
          ]);
          // confirm-mail/[EMAIL]/[TOKEN]
        }
        if (this.key) {
          this.authService.verifyEmail(mail, this.key).subscribe((result) => {
            if (result && result.user.id) {
              this.router.navigate(['/']);
            }
          });
        }
        return valid;
      });
    });
  }

  ngOnInit() {
    this.viewSettings.section.idx = 1;
    this.title = 'Email bestätigen';
    this.subTitle = 'Bitte überprüfen Sie Ihre Emails.';
    this.submitText = 'Email link erneut anfordern';
  }
}
