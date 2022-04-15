import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../packages/auth.api';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';
import { EAuthResponse } from '../packages/auth.enum.resoponse';
import { passwordConfirm } from '../packages/auth.validator';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  public registerForm = this.fb.group({
    gender: new FormControl('O', [Validators.required]),
    fistName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
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
    birthday: new FormControl('', []),
  });

  public viewSettings = {
    dsgvo:
      'Indem du auf „Registrieren“ klickst, stimmst du unseren Nutzungsbedingungen zu. In unserer Datenrichtlinie erfährst du, wie wir deine Daten erfassen, verwenden und teilen. Unsere Cookie-Richtlinie erklärt, wie wir Cookies und ähnliche Technologien verwenden. Facebook schickt dir eventuell Benachrichtigungen per SMS, die du jederzeit abbestellen kannst.',
  };

  protected invitationCode = '';

  private subscriptions: any[] = [];

  constructor(
    public authService: AuthService,
    public router: Router,
    private fb: FormBuilder,
    private ac: ActivatedRoute
  ) {
    this.subscriptions.push(
      ac.paramMap.subscribe((pm) => {
        this.invitationCode = <string>pm.get('invitation');
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  submit() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      this.authService
        .register(
          {
            ...formValues,
            password: '',
            invitationCode: this.invitationCode, // assings to company
          },
          {
            password: formValues.password,
            email: formValues.email,
          }
        )
        .pipe(
          tap((value) =>
            value ? sessionStorage.setItem('email', formValues.email) : null
          ),
          tap((value) => (value ? this.router.navigate(['/auth']) : null))
        )
        .subscribe((response) => {
          if (EAuthResponse.UserExits === response) {
            this.registerForm.controls['email']?.setErrors(['mail_exists']);
          } else {
            this.router.navigate(['/auth']);
          }
        });
    } else {
      for (const control in this.registerForm.controls) {
        this.registerForm.controls[control].markAsDirty();
      }
      this.registerForm.updateValueAndValidity();
    }
  }
}
