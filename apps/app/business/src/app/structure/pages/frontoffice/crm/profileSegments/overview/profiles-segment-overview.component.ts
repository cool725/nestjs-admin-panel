import { Component, Injector} from '@angular/core';
import { PageController } from '../../../../page.controller';
import { ProfileSagmentAPI } from '../packages/profile-sagment-api.service';
import { EDataEmitterType, ITableBaseFilter, Table } from '@movit/app/common';
import { Confirmable } from '@movit/app/decorators';
// import { ProfilesSagmentFormComponent } from "../form/profiles-sagment-form.component";

export class Segment {
  segmentId: number;
  companyId: number;

  title: string;
  color: string;
  order: string;

  static create(params: Partial<Segment>) {
    return Object.assign(new Segment(), params);
  }
}

@Component({
  selector: 'movit-profiles-sagment-overview',
  templateUrl: './profiles-segment-overview.component.html',
  styleUrls: ['./profiles-segment-overview.component.css'],
})
export class ProfilesSegmentOverviewComponent extends PageController {
  public profileSagmentTable = new Table<Segment, ITableBaseFilter>(
    this.api.profileSegments$
  );

  constructor(
    override injector: Injector,
    public api: ProfileSagmentAPI<Segment, any>
  ) {
    super(injector);
  }

  getData(): void {
    this.onLoadAndSetData(
      this.api.getSegments(),
      this.api.profileSegments$,
      (rows: any) => ({ 
        data: rows 
      })
    );
  }

  createSegment(){
    this.api.profileSegment$.next(new Segment())
  }

  async editSegment(id: number) {
    // load segment by api
    this.api.profileSegment$.next(new Segment())
  }

  @Confirmable({ title: 'Sure?' })
  async deleteProfile(id: number) {
    await this.api.deleteProfile(id).subscribe(
        ()=> this.reloadData()
    );

  }
}
