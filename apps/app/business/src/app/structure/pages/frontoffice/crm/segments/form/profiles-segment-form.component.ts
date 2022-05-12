import { Component, Injector, OnInit } from '@angular/core';
import { FormController } from '../../../../form.controller';
import { ProfileSegmentAPI } from '../packages/profile-sagment-api.service';
import { FormControl, Validators } from '@angular/forms';
import { Confirmable } from '../../../../../../../../../../../libs/app/common/decorators';
import { Segment } from '../overview/profiles-segment-overview.component';

@Component({
  selector: 'movit-profiles-segment-form',
  templateUrl: './profiles-segment-form.component.html',
  styleUrls: ['./profiles-segment-form.component.scss'],
})
export class ProfilesSegmentFormComponent
  extends FormController<Segment>
  implements OnInit
{
  viewSettings = {
    type: 'modal',
  };

  formSegment = this.fb.group({
    title: new FormControl('', [Validators.required, Validators.max(71)]),
    color: new FormControl('', []),
    order: new FormControl(1, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  constructor(
    override injector: Injector,
    public api: ProfileSegmentAPI<Segment, any>
  ) {
    super(injector);
  }

  ngOnInit() {
    const values: any = this.api.profileSegment$.getValue();
    this.formSegment.patchValue(values);
  }

  getData(): void {
    if (this.getId()) {
      this.loadSegment();
    }
  }

  loadSegment(segmentId = this.getId()) {
    this.onLoadAndSetData(
      this.api.getSegment(segmentId),
      this.api.profileSegment$,
      (segment: Partial<Segment>) => {
        this.formSegment.patchValue(segment);
        return Segment.create(segment);
      }
    );
  }

  async saveSegment(segment: Segment) {
    if (this.formSegment.invalid) {
      console.log(this.formSegment);
      return;
    }

    const values = this.formSegment.value;
    const api$ = segment.segmentId
      ? this.api.updateSegment(segment.segmentId, values)
      : this.api.saveSegment(values);
    api$.subscribe(() => {
      this.onSave.emit();
      this.api.profileSegment$.next(null);
    });
  }

  @Confirmable({
    title: 'Sure?',
  })
  async delete(segmentId: number) {
    await this.api.deleteSegment(segmentId);
    return this.cancel();
  }

  // todo rename
  cancel() {
    this.onCancel.emit();
    this.api.profileSegment$.next(null);
  }
  closePopup() {
    this.api.profileSegment$.next(null);
  }
}
