import { Component, Injector, OnInit } from '@angular/core';
import { FormController } from '../../../form.controller';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { AgendaAPI } from '../packages/agenda-api.service';
import { Debounce } from '@movit/app/common';
import { tap } from 'rxjs';
import {ProfilesFormComponent} from "../../crm/profiles/form/profiles-form.component";

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
  employees: any = [];

  constructor(
    override injector: Injector,
    private api: AgendaAPI<Reservation>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.getId()) {
     this.getReservationById(this.getId())
    }
  }

  getReservationById(reservationId:number = this.getId()){
    this.onLoadAndSetData(
        this.api.getReservation(reservationId),
        this.api.reservation$,
        (data: any) => {
          this.filteredProfiles = data.profiles
          console.log(data)
          this.reservationForm.reset();
          this.reservationForm.patchValue({
            title: data.title,
            startDate: data.start?.split('T')[0],
            endDate: data.end?.split('T')[0],
            profileIds: data.profileIds,
          });


          return Reservation.create(data);
        }
    );
  }

  override getData(): void {}

  save(reservation: any) {
    this.api.saveReservation(this.reservationForm.value).subscribe();
    this.onSave.emit();
    this.closeModal();
  }

  cancel() {
    this.closeModal();
  }

  // modal
  openProfileModal(profileId?:number){
    return this.openModal(ProfilesFormComponent, {
      id: profileId,
    }).then((r:any)=> {

      if( r ){
        this.filteredProfiles.push(r);
        const values = this.reservationForm.value;
        values.profileIds.push(r.profileId);
        values.profileIds = values.profileIds.map((id:any)=>+id);
        this.reservationForm.patchValue(
            values
        )
      }

    });
  }

  openInCashSystem(){}

  // region data

  getEmployees(){
    this.api
        .getEmployees()
          .pipe(tap((values: any) => (this.employees = values.data)))
            .subscribe();
  }

  @Debounce(300)
  searchProfile(searchTerm: any) {
    this.api
        .searchProfiles(searchTerm)
        .pipe(tap((values: any) => (this.filteredProfiles = values.data)))
        .subscribe();
  }

  // endregion
}
