import { Component, Injector} from '@angular/core';
import { PageController } from '../../../../page.controller';
import { ProfileSagmentAPI } from '../packages/profile-sagment-api.service';
import { EDataEmitterType, ITableBaseFilter, Table } from '@movit/app/common';
import { Confirmable } from '@movit/app/decorators';
// import { ProfilesSagmentFormComponent } from "../form/profiles-sagment-form.component";

export class sagment {
  segmentId: number;
  companyId: number;

  
  title: string;
  color: string;
  order: string;

  static create(params: Partial<sagment>) {
    return Object.assign(new sagment(), params);
  }
}

@Component({
  selector: 'movit-profiles-sagment-overview',
  templateUrl: './profiles-sagment-overview.component.html',
  styleUrls: ['./profiles-sagment-overview.component.css'],
})
export class ProfilesSagmentOverviewComponent extends PageController {
  public profileSagmentTable = new Table<sagment, ITableBaseFilter>(
    this.api.profilesagments$
  );

  constructor(
    override injector: Injector,
    public api: ProfileSagmentAPI<sagment, any>
  ) {
    super(injector);
  }

  getData(): void {
    this.onLoadAndSetData(
      this.api.getSegments(),
      this.api.profilesagments$,
      (rows: any) => ({ 
        data: rows 
      })
    );
  }

  async editProfile(id: number) {
    // this.openModal(EDataEmitterType.ModalOpen, ProfilesSagmentFormComponent,{
    //   id:id
    // })
  }

  @Confirmable({ title: 'Sure?' })
  async deleteProfile(id: number) {
    await this.api.deleteProfile(id).subscribe(
        ()=> this.reloadData()
    );

  }
}
