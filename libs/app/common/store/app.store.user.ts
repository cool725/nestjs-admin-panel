import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { AppApiBase } from '@movit/app/common';
import { Cacheable } from 'angular-cacheable';
import { UserAPI } from '../services/app.api.user';

interface User {
  avatar: string;
  displayName: string;
  firstName: string;
  lastName: string;
  userId: string;
}

const getFirstChar = (x: string) => (x || '').charAt(0).toUpperCase();

@Injectable({ providedIn: 'root' })
export class UserStore {
  private readonly user$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(protected api: UserAPI) {}

  get userValues(): User {
    return this.user$.value as User;
  }

  protected loadAndSetUser(): Observable<User> {
    return this.api.me().pipe(
      map((value: any) => {
        value.displayName =
          getFirstChar(value.firstName) + getFirstChar(value.lastName);
        this.user$.next(value);
        return value;
      })
    );
  }

  public reloadUser(): Observable<boolean> {
    return this.loadAndSetUser().pipe(map((value) => !!value.userId));
  }
}
