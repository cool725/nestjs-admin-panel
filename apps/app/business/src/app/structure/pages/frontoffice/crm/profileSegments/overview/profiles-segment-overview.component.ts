import { Component, Injector, OnDestroy } from '@angular/core';
import { PageController } from '../../../../page.controller';
import { ProfileSegmentAPI } from '../packages/profile-sagment-api.service';
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
  showPopup: boolean = false;
  public profileSagmentTable = new Table<Segment, ITableBaseFilter>(
    this.api.profileSegments$
  );

  constructor(
    override injector: Injector,
    public api: ProfileSegmentAPI<Segment, any>
  ) {
    super(injector);
    this.api.profileSegment$.subscribe((ress)=>{
      if(ress==null){
        this.getData();
      }
    })
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

  async editSegment(id:number) {
    // load segment by api
    this.api.getSegment(id).subscribe((resss:any)=>{
    this.api.profileSegment$.next(resss)
    });
  }

  @Confirmable({ title: 'Sure?' })
  async deleteProfile(id: number) {
    await this.api.deleteProfile(id).subscribe(
        ()=> this.reloadData()
    );

  }
  closePopup(){
    this.api.profileSegment$.next(null)   
  }
}
