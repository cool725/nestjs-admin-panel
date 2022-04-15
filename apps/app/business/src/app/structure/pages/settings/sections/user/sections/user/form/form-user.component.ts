import {
  Component,
  EventEmitter,
  Injector,
  Input,
  Output,
} from '@angular/core';
import { BehaviorSubject, catchError, map, of, Subject, tap } from 'rxjs';
import { SettingUserAPI } from '../../../packages/user-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageController } from '../../../../../../page.controller';
import { FormController } from '../../../../../../form.controller';

class User {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  phone: string;
  birthDay: string;

  constructor() {}

  static create(user: Partial<User> = {}): User {
    return Object.assign(new User(), user);
  }
}

@Component({
  selector: 'movit-edit-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css'],
})
export class FormUserComponent<T> extends FormController<User> {
  @Input() inline = false;

  @Input() user$ = new BehaviorSubject<User>(new User());

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix

  forms = {};

  constructor(
    override injector: Injector,
    protected userAPI: SettingUserAPI,
    protected router: Router
  ) {
    super(injector);
  }

  getData(): void {
    this.getUser();
  }

  getUser(userId: any = this.getId('userId')) {
    if (!userId) return;
    return this.userAPI
      .getUser(userId)
      .pipe(tap((user) => this.user$.next(User.create(user))))
      .subscribe();
  }

  verifyFields() {
    const form: any = document.getElementById('setting-form-user');
    let elements = [
      ...form.querySelectorAll('input'),
      ...form.querySelectorAll('textarea'),
      ...form.querySelectorAll('select'),
    ].filter((el) => el.required);
    elements = elements.filter((el) => !el.value);
    if (elements.length) {
      return false;
    }
    return true;
  }

  doSave(data: any) {
    if (!this.verifyFields()) {
      return console.warn('Form is not valid');
    }

    if (!this.inline) this.saveUser(data);
    this.onSave.emit(data);
  }

  saveUser(user: any) {
    const save = user.userId
      ? this.userAPI.updateUser(user)
      : this.userAPI.createUser(user);

    save
      .pipe(
        catchError(({ error }) => {
          console.log(error);
          return of(null);
        })
      )
      .subscribe((result) => {
        if (result) this.navBack();
      });
  }

  navBack() {
    this.router.navigate([this.basePath + '/settings/user/overview/']);
  }

  isValid(key: string, user: User) {}
}
