import { Component, Injector, OnInit } from '@angular/core';
import { FormController } from '../../../../form.controller';
import { ProfilesAPI } from '../packages/profile-api.service';
import { FormControl, Validators } from '@angular/forms';

class Profiles {}

@Component({
  selector: 'movit-profiles-form',
  templateUrl: './profiles-form.component.html',
  styleUrls: ['./profiles-form.component.scss'],
})
export class ProfilesFormComponent extends FormController<Profiles> {
  viewSettings = {
    type: 'modal',
  };

  formProfile = this.fb.group({
    gender: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.max(100)]),
    lastName: new FormControl('', [Validators.max(100)]),
    phone: new FormControl('', [Validators.max(16)]),
    email: new FormControl('', [Validators.email]),
  });

  constructor(
    override injector: Injector,
    public api: ProfilesAPI<Profiles, any>
  ) {
    super(injector);
    api.profile$.next(new Profiles());
  }

  getData(): void {}

  async save(profile: Partial<Profiles>) {
    const api$ = await this.api.saveProfile(profile);
    api$.subscribe();
    this.onSave.emit();
  }

  cancel(profile: Partial<Profiles>) {
    this.onCancel.emit();
  }
}
