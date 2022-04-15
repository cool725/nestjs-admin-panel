import { LoginComponent } from './login.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipeModule } from '@movit/app/common';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../packages/auth.api';
import { catchError, of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const testUser = {
    email: 'spec.test@test.ch',
    password: 'spec.test@test.ch',
    uuId: 'test:D38B704C@2B6A0F01CA5@20BC0FC49A3-122',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TranslatePipeModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [
        {
          provide: 'uuId',
          useValue: testUser.uuId,
        },
      ],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid LoginForm', () => {
    component.loginForm.get('email').setValue(testUser.email);
    component.loginForm.get('password').setValue(testUser.password);
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should register test user', (done) => {
    TestBed.get(AuthService)
      .register(
        {
          firstName: 'testUser',
          lastName: 'testUser',
          gender: 'M',
          password: '',
        },
        testUser
      )
      .pipe(
        catchError((error: any) => {
          expect(+error.status === 409).toBeTruthy(); // user exsits
          return of({ userId: ' ' });
        })
      )
      .subscribe(({ userId }: any) => {
        expect(typeof userId === 'string').toBeTruthy();
        done();
      });
  });

  it('should login test user', (done) => {
    const authService: AuthService = TestBed.get(AuthService);

    component.onFailure = () => null;

    authService
      .signIn(testUser)
      .pipe(
        catchError((response) => {
          expect(
            response.error.message === 'No rights to company'
          ).toBeTruthy();
          done();
          return of({ message: 'done' });
        })
      )
      .subscribe((response) => {
        if (response.message === 'done') return;
        expect(response.message === 'No rights to company').toBeTruthy();
        done();
        return response;
      });
  });

  it('should remove test users', (done) => {
    const authService: AuthService = TestBed.get(AuthService);
    authService
      .removeTestUser(testUser.email, testUser.email)
      .pipe(
        catchError((err) => {
          console.log(err);
          return err;
        })
      )
      .subscribe((response: any) => {
        expect(response == 1).toBeTruthy();
        done();
        return response;
      });
  });
});
