import {Component, Injector} from '@angular/core';
import {PageController} from "../../../../page.controller";
import {ProfilesAPI} from "../packages/profile-api.service";
import {ITableBaseFilter, Table} from "@movit/app/common";

class Profile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'movit-profiles-overview',
  templateUrl: './profiles-overview.component.html',
  styleUrls: ['./profiles-overview.component.css']
})
export class ProfilesOverviewComponent extends PageController {

  profileTable = new Table<Profile, ITableBaseFilter>(this.api.profiles$);

  constructor(
    override injector: Injector,
    private api: ProfilesAPI<Profile>
  ) {
    super(injector);
  }

  getData() {
    this.onLoadAndSetData(this.api.getProfiles(), this.api.profiles$);
  }

  askDelete(id: number) {
    if (!window.confirm('Are you sure to delete?')) {
      return;
    }

    this.api.deleteProfile(`${id}`).subscribe(() => this.getData());
  }
}
