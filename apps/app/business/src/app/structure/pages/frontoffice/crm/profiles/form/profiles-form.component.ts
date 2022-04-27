import { Component, Injector, OnInit } from '@angular/core';
import { FormController } from '../../../../form.controller';
import { ProfilesAPI } from '../packages/profile-api.service';
import { FormControl, Validators } from '@angular/forms';
import {Confirmable} from "@movit/app/decorators";

class Profiles {
  profileId: number;
}

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
    const profileValues = this.formProfile.value;
    const api$ = await this.api.saveProfile(profileValues);
    api$.subscribe();
    this.onSave.emit();
  }

  @Confirmable({
    title:'Sure?'
  })
  delete(profileId:number){
    return this.api.deleteProfile(profileId)
  }

  cancel(profile: Partial<Profiles>) {
    this.onCancel.emit();
  }
}
