import { Component, Injector, OnInit } from '@angular/core';
import { FormController } from '../../../../form.controller';
import { ProfilesAPI } from '../packages/profile-api.service';
import { FormControl, Validators } from '@angular/forms';
import { Confirmable } from '../../../../../../../../../../../libs/app/common/decorators';
import { Profile } from '../overview/profiles-overview.component';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'movit-profiles-form',
  templateUrl: './profiles-form.component.html',
  styleUrls: ['./profiles-form.component.scss'],
})
export class ProfilesFormComponent extends FormController<Profile> {
  viewSettings = {
    type: 'modal',
    mode: 'simple',
    changeMode(mode: string) {
      this.mode = mode;
    },
  };

  formProfile = this.fb.group({
    gender: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.max(100)]),
    firstName: new FormControl('', [Validators.max(100)]),
    lastName: new FormControl('', [Validators.max(100)]),
    phone: new FormControl('', [Validators.maxLength(16)]),
    email: new FormControl('', [Validators.email]),
    birthDay: new FormControl('', []),
    vip: new FormControl('', []),
    languageId: new FormControl('', []),
    segments: new FormControl([], []),
    priceClass: new FormControl('', []),
    source: new FormControl('', []),
  });

  segments$ = new BehaviorSubject<any[]>([]);

  sources$ = new BehaviorSubject<any[]>([]);

  priceClasses$ = new BehaviorSubject<any[]>([]);

  isLoading = false;

  constructor(override injector: Injector, public api: ProfilesAPI<Profile>) {
    super(injector);
  }

  get profileType() {
    return this.formProfile.value.gender;
  }

  override getData(loadProfile = true): void {
    if (loadProfile) {
      if (this.getId()) {
        this.loadProfile();
      } else this.api.profile$.next(new Profile());
    }

    this.onLoadAndSetData(this.api.getSegments(), this.segments$);
    this.onLoadAndSetData(this.api.getSources(), this.sources$);
    this.onLoadAndSetData(this.api.getPriceClass(), this.priceClasses$);
  }

  loadProfile(id = this.getId()) {
    this.isLoading = true;
    this.onLoadAndSetData(
      this.api.getProfile(id),
      this.api.profile$,
      (profile: Partial<Profile>) => {
        this.formProfile.patchValue(profile);
        this.isLoading = false;
        return Profile.create(profile);
      }
    );
  }

  async save(profile: Partial<Profile>, closeOnSave = true) {
    const formValues = this.formProfile.value;
    const api$ = profile.profileId
      ? this.api.updateProfile(profile.profileId, formValues)
      : this.api.saveProfile(formValues);

    api$.pipe();
    api$.subscribe(
      (data) => {
        if (closeOnSave && this.viewSettings.type === 'modal') {
          this.resetData();
          this.closeModal();
        }
      },
      ({ error }) => {
        const keys = error.message.map((message: string) =>
          message.split(' ')[0].trim()
        );
        for (let i = 0; i < keys.length; i++) {
          const key: string = keys[i];
          console.log(key, this.formProfile.controls[key]);
          this.formProfile.controls[key].setErrors({ incorrect: true });
        }
      }
    );

    this.onSave.emit(Object.assign(profile, formValues));
  }

  @Confirmable({
    title: 'Sure?',
  })
  async delete(profileId: number) {
    await this.api.deleteProfile(profileId);
    return this.cancel();
  }

  // todo rename
  // add comment
  cancel() {
    this.resetData();
    this.closeModal();
    this.onCancel.emit();
  }

  resetData() {
    this.api.profile$.next(<any>null);
  }
}
