import { Component, Injector } from '@angular/core';
import { PageController } from '../../../../page.controller';
import { ProfilesAPI } from '../packages/profile-api.service';
import { Confirmable, Debounce, ITableBaseFilter, Table } from '@movit/app/common';
import { ProfilesFormComponent } from '../form/profiles-form.component';
import { Profile } from '../packages/profile.class';

@Component({
  selector: 'movit-profiles-overview',
  templateUrl: './profiles-overview.component.html',
  styleUrls: ['./profiles-overview.component.css'],
})
export class ProfilesOverviewComponent extends PageController {

  public profileTable: Table<Profile, ITableBaseFilter> =
    new Table<Profile, ITableBaseFilter>(this.api.profiles$, {
    searchValue: '',
    keys: ['firstName', 'lastName', 'phone', 'email'],
  }).setFields(['firstName', 'lastName', 'email', 'phone', 'birthDay']);

  constructor(override injector: Injector, public api: ProfilesAPI<Profile>) {
    super(injector);
  }

  getData(): void {
    this.getProfiles();
  }

  @Debounce(300)
  getProfiles(resetCurrentPage = false) {
    if (resetCurrentPage) {
      this.profileTable.pagination.currentPage = 1;
    }
    this.onLoadAndSetPaginatedData(
      this.api.getProfiles(this.profileTable.getFilterValuesAndPaginationAsHttpParams()),
      this.api.profiles$,
      this.profileTable
    );
  }

  createProfile() {
    this.openModal(ProfilesFormComponent, {}).then(() => this.getData());
  }

  editProfile(id: number) {
    return this.openModal(ProfilesFormComponent, {
      id: id,
    });
  }

  @Confirmable({ title: 'Sure?' })
  async deleteProfile(id: number) {
    return this.api.deleteProfile(id).subscribe(() => this.reloadData());
  }

  mockupImporter() {
    fetch('https://627594d0bc9e46be1a0ce35d.mockapi.io/profiles')
      .then((r) => r.json())
      .then((rows) => {
        for (let i = 0; i < rows.length; i++) {
          rows[i].gender = rows[i].gender == 'F2M' ? 'W' : 'M';
          rows[i].phone = '+41789000000';
          rows[i].segments = [];
          this.api.saveProfile(rows[i]).subscribe();
        }
      })
      .then(() => setTimeout(() => this.getData(), 5000));
  }
}
