import {Component, Injector} from '@angular/core';
import {PageController} from '../../../../page.controller';
import {ProfilesAPI} from '../packages/profile-api.service';
import { EDataEmitterType, ITableBaseFilter, Table} from '@movit/app/common';
import {Confirmable} from '@movit/app/decorators';
import {ProfilesFormComponent} from "../form/profiles-form.component";

export class Profile {
  profileId: number;
  companyId: number;

  gender:'C'|'M'|'W'
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  static create(params: Partial<Profile>) {
    return Object.assign(new Profile(), params);
  }
}

@Component({
  selector: 'movit-profiles-overview',
  templateUrl: './profiles-overview.component.html',
  styleUrls: ['./profiles-overview.component.css'],
})
export class ProfilesOverviewComponent extends PageController {
  public profileTable = new Table<Profile, ITableBaseFilter>(
    this.api.profiles$
  );

  constructor(
    override injector: Injector,
    public api: ProfilesAPI<Profile, any>
  ) {
    super(injector);
  }

  getData(): void {
    this.onLoadAndSetData(
      this.api.getProfiles(),
      this.api.profiles$,
      (rows: any) => ({ data: rows })
    );
  }

  async editProfile(id: number) {
    await this.api.deleteProfile(id);
    this.testModal()
  }
  @Confirmable({ title: 'Sure?' })
  async deleteProfile(id: number) {
    await this.api.deleteProfile(id);
    this.reloadData();
  }

  testModal(){
    this.openModal(EDataEmitterType.ModalOpen,ProfilesFormComponent)
  }
}
