import { Component, Injector } from '@angular/core';
import { SettingUserAPI } from '../../../packages/user-api.service';
import { PageController } from '../../../../../../page.controller';
import { Subject, tap } from 'rxjs';

function validateEmail(mail: string) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}

@Component({
  selector: 'movit-user.new',
  templateUrl: './user.new.component.html',
  styleUrls: ['./user.new.component.css'],
})
export class UserNewComponent extends PageController {
  inventionUsers$ = new Subject<any[]>();
  constructor(override injector: Injector, public userAPI: SettingUserAPI) {
    super(injector);
    this.getData();
  }

  getData() {
    this.onLoadAndSetData(this.userAPI.getInvitedUsers(), this.inventionUsers$);
  }

  inviteUser(email: string) {
    if (!email) return;

    if (!validateEmail(email)) {
      return alert('Email ist ungültig');
    }

    this.userAPI
      .inviteUser(email)
      .pipe(tap(() => this.getData()))
      .subscribe();
  }

  deleteInviteUser(email: string) {
    if (email && confirm('Sicher?'))
      this.userAPI
        .deleteInviteUser(email)
        .pipe(tap(() => this.getData()))
        .subscribe();
  }
}
