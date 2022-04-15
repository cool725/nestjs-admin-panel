import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../packages/auth.api';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { passwordConfirm } from '../packages/auth.validator';

@Component({
  selector: 'auth-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  formContainer = {
    title: '',
    mainText: '',
    submitText: '',
    form: this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        passwordConfirm,
      ]),
    }),
  };

  viewSettings = {
    visible: true,
    section: {
      idx: 1,
      next() {
        this.idx++;
      },
    },
  };

  showSection = {
    checkMail: () => {
      this.formContainer.title = 'Email überprüfen';
      this.formContainer.mainText =
        'Sie erhalten in kürze eine Email mit dem Resetlink. ';
      this.formContainer.submitText = 'Erneut senden';
      this.viewSettings.section.idx = 2;
    },
    passwordChange: () => {
      this.formContainer.title = 'Geben Sie einen neues Passwort ein';
      this.formContainer.mainText = '';
      this.viewSettings.section.idx = 3;
    },
  };

  code = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    public fb: FormBuilder,
    private ac: ActivatedRoute
  ) {
    ac.paramMap.subscribe((pm) => {
      const mail: string = <any>pm.get('mail');
      const code: string = <any>pm.get('code');

      if (code) {
        this.authService
          .verifyPasswordResetLink({ code: code, email: mail })
          .subscribe((data) => {
            if (data && data.userId) {
              this.showSection.passwordChange();
              this.code = code;
              this.formContainer.form.controls['email'].setValue(mail);
            } else {
              this.formContainer.title = 'Link abgelaufen';
              this.formContainer.mainText =
                'Sie werden in kürze weitergeleitet';
              this.viewSettings.visible = false;
              setTimeout(() => this.router.navigate(['/auth']), 4000);
            }
          });
      }
    });
  }

  ngOnInit() {
    this.viewSettings.section.idx = 1;
    this.formContainer.title = 'account_recovery';
    this.formContainer.submitText = 'reset';
  }

  submit({ section }: { section: number }) {
    //view 1 Get Code
    if (section === 1) {
      this.authService
        .forgotPassword({
          email: this.formContainer.form.value?.email,
        })
        .subscribe();
      this.showSection.checkMail();
    }

    //view 2 Verify Code
    if (section === 2) {
      this.authService
        .forgotPassword(this.formContainer.form.value)
        .subscribe((data) => {
          if (data && data.userId) {
            this.showSection.passwordChange();
          }
        });
    }

    // Submit Password
    if (section === 3) {
      if (!this.formContainer.form.valid) {
        return console.log('Form is not valid', this.formContainer.form);
      }

      this.authService
        .resetPassword({
          code: this.code,
          ...this.formContainer.form.value,
        })
        .subscribe((result: any) => {
          if (result && result.userId) {
            sessionStorage.setItem(
              'email',
              this.formContainer.form.value.email
            );
            // notify Changed success
            this.router.navigate(['/auth']);
          }
        });
    }
  }
}
