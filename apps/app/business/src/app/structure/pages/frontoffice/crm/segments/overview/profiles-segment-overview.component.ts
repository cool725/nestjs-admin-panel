import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { PageController } from '../../../../page.controller';
import { ProfileSegmentAPI } from '../packages/profile-sagment-api.service';
import { EDataEmitterType, ITableBaseFilter, Table } from '@movit/app/common';
import { Confirmable } from '../../../../../../../../../../../libs/app/common/decorators';

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
  public profileSegmentTable = new Table<Segment, ITableBaseFilter>(
    this.api.profileSegments$
  );

  constructor(
    override injector: Injector,
    public api: ProfileSegmentAPI<Segment, any>
  ) {
    super(injector);
  }

  getData(): void {
    this.getSegments();
  }

  getSegments() {
    this.onLoadAndSetData(
      this.api.getSegments(),
      this.api.profileSegments$
    );
  }

  createSegment() {
    this.api.profileSegment$.next(new Segment());
  }

  async editSegment(id: number) {
    // load segment by api
    this.api.getSegment(id).subscribe((segment: any) => {
      this.api.profileSegment$.next(segment);
    });
  }

  @Confirmable({ title: 'Sure?' })
  async deleteSegment(id: number) {
    await this.api.deleteSegment(id).subscribe(() => this.reloadData());
  }
  closePopup() {
    this.api.profileSegment$.next(null);
  }
}
