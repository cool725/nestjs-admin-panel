import { Component, Injector, OnInit } from '@angular/core';
import { FormController } from '../../../../form.controller';
import { ProfilesAPI } from '../packages/profile-api.service';
import { FormControl, Validators } from '@angular/forms';
import { Confirmable } from '@movit/app/decorators';
import { Profile } from '../overview/profiles-overview.component';

@Component({
  selector: 'movit-profiles-form',
  templateUrl: './profiles-form.component.html',
  styleUrls: ['./profiles-form.component.scss'],
})
export class ProfilesFormComponent extends FormController<Profile> {
  viewSettings = {
    type: 'modal',
  };

  formProfile = this.fb.group({
    gender: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.max(100)]),
    firstName: new FormControl('', [Validators.max(100)]),
    lastName: new FormControl('', [Validators.max(100)]),
    phone: new FormControl('', [Validators.max(16)]),
    email: new FormControl('', [Validators.email]),
    birthDay: new FormControl('', []),
    vip: new FormControl('', []),
    languageId: new FormControl('', []),
    segments: new FormControl('', []),
    priceClass: new FormControl('', []),
    source: new FormControl('', []),
  });

  constructor(
    override injector: Injector,
    public api: ProfilesAPI<Profile, any>
  ) {
    super(injector);
    api.profile$.next(new Profile());
  }

  get profileType(){
    return this.formProfile.value.gender
  }

  getData(): void {
    if(this.getId()){
      this.onLoadAndSetData(
       this.api.getProfile(this.getId()),
          this.api.profile$,
          (profile:Partial<Profile>)=> {
           this.formProfile.patchValue(profile);
           return Profile.create(profile)
          }
      );
    }
  }

  async save(profile: Partial<Profile>) {
    const profileValues = this.formProfile.value;
    const api$ = await this.api.saveProfile(profileValues);
    api$.subscribe();
    this.onSave.emit();
  }

  @Confirmable({
    title: 'Sure?',
  })
  async delete(profileId: number) {
     await this.api.deleteProfile(profileId);
     return this.cancel();
  }

  // todo rename
  cancel() {
    this.onCancel.emit();
  }
}
