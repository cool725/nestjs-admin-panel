import { Component, Injector, OnInit } from '@angular/core';
import { FormController } from '../../../form.controller';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { AgendaAPI } from '../packages/agenda-api.service';
import { Debounce } from '@movit/app/common';
import { tap } from 'rxjs';

class Reservation {
  static create(params: Partial<Reservation>) {
    return params;
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
    place: new FormControl('', [Validators.max(200)]),
    profileIds: new FormControl([], []),
    state: new FormControl('', [Validators.required]),
    confidentiality: new FormControl('', [Validators.required]),
    duration: new FormControl(''),
    price: new FormControl(
      {
        value: 0,
        disabled: true,
      },
      [Validators.required]
    ),
    startDate: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    employee: new FormControl('', [Validators.required]),
    employeeIds: new FormArray([new FormControl('')]),
  });

  filteredProfiles: any = [];

  constructor(
    override injector: Injector,
    private api: AgendaAPI<Reservation>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.getId()) {
      this.onLoadAndSetData(
        this.api.getReservation(this.getId()),
        this.api.reservation$,
        (res: any) => {
          this.reservationForm.setValue({
            title: res.title,
            start: res.start?.split('T')[0],
            end: res.end?.split('T')[0],
          });
          return Reservation.create(res);
        }
      );
    }
  }

  override getData(): void {}

  save(reservation: any) {
    console.log(this.reservationForm.value);

    this.api.saveReservation(this.reservationForm.value).subscribe();
    this.onSave.emit();
    this.closeModal();
  }

  cancel() {
    this.closeModal();
  }

  @Debounce(300)
  searchProfile(searchTerm: any) {
    this.api
      .searchProfiles(searchTerm)
      .pipe(tap((values: any) => (this.filteredProfiles = values.data)))
      .subscribe();
  }
}
