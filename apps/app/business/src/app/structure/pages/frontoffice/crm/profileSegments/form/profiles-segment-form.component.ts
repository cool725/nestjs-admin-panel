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
    title: new FormControl('', [Validators.required,Validators.max(100)]),
     color: new FormControl('#ff0000', [Validators.required]),
    order: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
  });

  constructor(
    override injector: Injector,
    public api: ProfileSegmentAPI<Segment, any>
  ) {
    super(injector);
    api.profileSegment$.subscribe(segment=>{
      if(segment){
           this.formSegment.patchValue(segment);
      }
      
    });
    // api.profileSegment$.next(new Segment());
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

  async saveSegment() {
    console.log(this.formSegment)
    if(this.formSegment.invalid){
      console.log(this.formSegment)
      return;
    }
    const values = this.formSegment.value;
    const api$ = await this.api.saveSegment(values);
    api$.subscribe();
    this.onSave.emit();
     this.api.profileSegment$.next(null)
  }
  async updateSegment(segment:number){
    if(this.formSegment.invalid){
      return;
    }
     const values = this.formSegment.value;
    const api$ = await this.api.updateSegment(segment,values);
    api$.subscribe();
     this.api.profileSegment$.next(null)
    
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
    this.api.profileSegment$.next(null)
  }
}
