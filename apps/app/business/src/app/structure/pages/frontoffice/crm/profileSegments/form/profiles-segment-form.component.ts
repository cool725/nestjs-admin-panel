import { Component, Injector, OnInit } from '@angular/core';
import { FormController } from '../../../../form.controller';
import { ProfileSegmentAPI } from '../packages/profile-sagment-api.service';
import { FormControl, Validators } from '@angular/forms';
import { Confirmable } from '@movit/app/decorators';
import { Segment } from '../overview/profiles-segment-overview.component';

@Component({
  selector: 'movit-profiles-segment-form',
  templateUrl: './profiles-segment-form.component.html',
  styleUrls: ['./profiles-segment-form.component.scss'],
})
export class ProfilesSegmentFormComponent extends FormController<Segment> {
  viewSettings = {
    type: 'modal',
  };

  formSegment = this.fb.group({
    title: new FormControl('', [Validators.max(100)]),
  });

  constructor(
    override injector: Injector,
    public api: ProfileSegmentAPI<Segment, any>
  ) {
    super(injector);
    api.profileSegment$.next(new Segment());
  }

  getData(): void {
    if(this.getId()){
      this.onLoadAndSetData(
       this.api.getSegment(this.getId()),
          this.api.profileSegment$,
          (segment:Partial<Segment>)=> {
           this.formSegment.patchValue(segment);
           return Segment.create(segment)
          }
      );
    }
  }

  async save(segment: Partial<Segment>) {
    const values = this.formSegment.value;
    const api$ = await this.api.saveSegment(values);
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
