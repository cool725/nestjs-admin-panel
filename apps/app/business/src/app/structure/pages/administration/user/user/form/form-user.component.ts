import {
  Component,
  Injector,
  Input
} from '@angular/core';
import { BehaviorSubject, catchError,of, tap } from 'rxjs';
import { SettingUserAPI } from '../../packages/user-api.service';
import { Router } from '@angular/router';
import { FormController } from '../../../../form.controller';
import { Confirmable } from "@movit/app/common";

class User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  phone: string;
  birthDay: string;
  isEmployee: boolean;

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
    if (!userId) return of([]);
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

  @Confirmable({
    title: ''
  })
  deleteUser(user:any){
    return this.userAPI.deleteUser(user.userId)
      .subscribe(()=> this.navBack())
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

  isValid(key: string, user: User) {}

  navBack() {
    this.router.navigate([this.basePath + '/administration/user/overview/']);
  }
}
