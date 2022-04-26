import {Component, Injector, OnInit} from '@angular/core';
import {FormController} from "../../../../form.controller";

class Profiles {

}

@Component({
  selector: 'movit-profiles-form',
  templateUrl: './profiles-form.component.html',
  styleUrls: ['./profiles-form.component.scss']
})
export class ProfilesFormComponent extends FormController<Profiles> {

  viewSettings = {
    type:'modal'
  }

  constructor(override injector:Injector) {
    super(injector);
  }

  getData(): void {
    throw new Error('Method not implemented.');
  }

}
