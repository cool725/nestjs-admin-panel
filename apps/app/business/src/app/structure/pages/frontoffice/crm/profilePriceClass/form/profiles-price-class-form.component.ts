import { Component, Injector, OnInit } from '@angular/core';
import { FormController } from '../../../../form.controller';
import { ProfilePriceClassAPI } from '../packages/profile-price-class-api.service';
import { FormControl, Validators } from '@angular/forms';
import { Confirmable } from '@movit/app/decorators';
import { PriceClass } from '../overview/profiles-price-class-overview.component';

@Component({
  selector: 'movit-profiles-price-class-form',
  templateUrl: './profiles-price-class-form.component.html',
  styleUrls: ['./profiles-price-class-form.component.scss'],
})
export class ProfilesPriceClassFormComponent extends FormController<PriceClass> {
  viewSettings = {
    type: 'modal',
  };
showPercentage:boolean= false;
  formPriceClass = this.fb.group({
    standard: new FormControl('', [Validators.required]),
    color: new FormControl('#ff0000', [Validators.required]),
    isPercentage: new FormControl(false),
  });

  constructor(
    override injector: Injector,
    public api: ProfilePriceClassAPI<PriceClass, any>
  ) {
    super(injector);
    api.profilePriceClass$.subscribe((priceClass:any)=>{
      if(priceClass){
           this.formPriceClass.patchValue(priceClass);
      }
      
    });
    // api.profileSegment$.next(new Segment());
  }

  getData(): void {
    if(this.getId()){
      this.onLoadAndSetData(
       this.api.getPriceClass(this.getId()),
          this.api.profilePriceClass$,
          (priceClass:Partial<PriceClass>)=> {
           this.formPriceClass.patchValue(priceClass);
           return PriceClass.create(priceClass)
          }
      );
    }
  }

  async savePriceClass() {
    if(this.formPriceClass.invalid){
      console.log(this.formPriceClass)
      return;
    }
    const values = this.formPriceClass.value;
    const api$ = await this.api.savePriceClass(values);
    api$.subscribe();
    this.onSave.emit();
     this.api.profilePriceClass$.next(null)
  }
  async updatePriceClass(segment:number){
    if(this.formPriceClass.invalid){
      return;
    }
     const values = this.formPriceClass.value;
    const api$ = await this.api.updatePriceClass(segment,values);
    api$.subscribe();
     this.api.profilePriceClass$.next(null)
    
  }

  @Confirmable({
    title: 'Sure?',
  })
  async delete(profileId: number) {
     await this.api.deletePriceClass(profileId);
     return this.cancel();
  }

  // todo rename
  cancel() {
    this.onCancel.emit();
    this.api.profilePriceClass$.next(null)
  }

 
  eventCheck(event:any){
    this.showPercentage=event.target.checked
    console.log(this.showPercentage)
     console.log('form',this.formPriceClass)
    if(this.showPercentage){
      this.formPriceClass.addControl('percentage',new FormControl('', Validators.required))
    }else{
      this.formPriceClass.addControl('percentage',new FormControl(''))
    }
    this.formPriceClass.controls['percentage'].updateValueAndValidity();
    console.log(this.formPriceClass)
     
  }
}
