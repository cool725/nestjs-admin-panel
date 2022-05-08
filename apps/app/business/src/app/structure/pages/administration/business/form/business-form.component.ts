import { Component, Injector } from '@angular/core';
import { BusinessAPI, IBusiness } from '../business-api.service';
import { FormController } from '../../../form.controller';
import { FormControl } from '@angular/forms';
import { Confirmable } from '../../../../../../../../../../libs/app/common/decorators';

@Component({
  selector: 'movit-profiles-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.scss'],
})
export class BusinessFormComponent extends FormController<IBusiness> {
  viewSettings = {
    type: 'modal',
    mode: 'simple',
    changeMode(mode: string) {
      this.mode = mode;
    },
  };

  formBusiness = this.fb.group({
    source: new FormControl('', []),
  });

  constructor(override injector: Injector, public api: BusinessAPI) {
    super(injector);
  }

  override getData(): void {
    if (this.getId()) {
      this.onLoadAndSetData(
        this.api.getBusinesses(this.getId()),
        this.api.business$,
        (business: Partial<IBusiness>) => {
          this.formBusiness.patchValue(business);
          return business;
        }
      );
    }
  }

  async save(business: Partial<IBusiness>, closeOnSave = true) {
    const formValues = this.formBusiness.value;

    /*
    const api$ = business.companyId ? this.api.updateProfile(profile.profileId, formValues) : this.api.saveProfile(formValues);

    api$.pipe();
    api$.subscribe(
      (data) => {
        if (closeOnSave && this.viewSettings.type === 'modal') {
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
    * */
  }

  @Confirmable({
    title: 'Sure?',
  })
  async delete(businessId: number) {
    //await this.api.delete(businessId);
    return this.cancel();
  }

  // todo rename
  // add comment
  cancel() {
    this.onCancel.emit();
  }
}
