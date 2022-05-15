import { Component, Injector, OnInit } from '@angular/core';
import { FormController } from '../../../form.controller';
import {FormControl, Validators} from "@angular/forms";
import {AgendaAPI} from "../packages/agenda-api.service";

class Reservation{

  static create(params:Partial<Reservation>){
    return params
  }
}

@Component({
  selector: 'movit-agenda-form',
  templateUrl: './agenda-form.component.html',
  styleUrls: ['./agenda-form.component.css'],
})
export class AgendaFormComponent extends FormController<any> implements OnInit {
  viewSettings: any = {
    mode: 'mode',
  };

  reservationForm = this.fb.group({
    title: new FormControl('', [Validators.max(100)]),
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required]),
  });

  constructor(override injector: Injector,
              private api:AgendaAPI<Reservation>) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.getId()) {
      this.onLoadAndSetData(
          this.api.getReservation(this.getId()),
          this.api.reservation$, Reservation.create)
    }
  }

  override getData(): void {}

  save(reservation:any){
    console.log(
        this.reservationForm.value
    )
    this.api.saveReservation( this.reservationForm.value ).subscribe()
    //this.onSave.emit()
    //this.closeModal()
  }
}
