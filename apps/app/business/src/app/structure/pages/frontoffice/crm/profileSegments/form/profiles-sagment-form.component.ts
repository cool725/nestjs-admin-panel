import { Component, Injector, OnInit } from '@angular/core';
import { FormController } from '../../../../form.controller';
import { ProfileSagmentAPI } from '../packages/profile-sagment-api.service';
import { FormControl, Validators } from '@angular/forms';
import { Confirmable } from '@movit/app/decorators';
import { sagment } from '../overview/profiles-sagment-overview.component';

@Component({
  selector: 'movit-profiles-sagment-form',
  templateUrl: './profiles-sagment-form.component.html',
  styleUrls: ['./profiles-sagment-form.component.scss'],
})
export class ProfilesSagmentFormComponent extends FormController<sagment> {
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
    public api: ProfileSagmentAPI<sagment, any>
  ) {
    super(injector);
    api.profilesagment$.next(new sagment());
  }

  get profileType(){
    return this.formProfile.value.gender
  }

  getData(): void {
    if(this.getId()){
      this.onLoadAndSetData(
       this.api.getSagment(this.getId()),
          this.api.profilesagment$,
          (profile:Partial<sagment>)=> {
           this.formProfile.patchValue(profile);
           return sagment.create(profile)
          }
      );
    }
  }

  async save(profile: Partial<sagment>) {
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
