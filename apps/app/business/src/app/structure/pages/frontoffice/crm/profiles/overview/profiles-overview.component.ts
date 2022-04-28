import { Component, Injector } from '@angular/core';
import { PageController } from '../../../../page.controller';
import { ProfilesAPI } from '../packages/profile-api.service';
import { ITableBaseFilter, Table } from '@movit/app/common';
import { Confirmable } from '@movit/app/decorators';

export class Profile {
  profileId: number;
  companyId: number;

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

  @Confirmable({ title: '' })
  async deleteProfile(id: number) {
    await this.api.deleteProfile(id);
    this.reloadData();
  }
}
