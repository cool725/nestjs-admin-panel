import { Component, Injector, OnInit } from '@angular/core';
import { FormController } from '../../../form.controller';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { AgendaAPI } from '../packages/agenda-api.service';
import { Debounce } from '@movit/app/common';
import {ProfilesFormComponent} from "../../crm/profiles/form/profiles-form.component";

class Reservation {
  static create(params: Partial<Reservation>) {
    return params;
  }
  static mapForRequest(params: any) {
    // parse required infos for backend
    return {
      ...params,
      start: null,// startDate + startTime,
      end: null// startDate + startTime,
      // other infos
    };
  }
}

// todo create as directive
const generateDuration = () : { label:string,value: number}[] => {
    const timeDurations = []
    //fill time array
    let h = 0;
    let y = 5;
    let lb: any = "";
    //add time to dropdown
    for (let i = 0; i <= 111; i++) {
    if (y % 60 === 0) {
    h++
  } //stunden hinzufügen
  if (y <= 55)        //minuten formatieren
  {
    lb = y + 'min'
  }
  else if (y >= 60) {
    lb = h + 'h ' + (y - 60 * h) + 'min';
  } //Zeit formatieren

  const a = {label: lb, value: y}
  timeDurations.push(a)
  if (y >= 120) {
    y = y + 15;
  }
  else {
    y = y + 5;
  }
  }
  return timeDurations
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
    description: new FormControl('', [Validators.required]),

    state: new FormControl('', [Validators.required]),
    confidentiality: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),

    profileIds: new FormControl([], []),

    startDate: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    duration: new FormControl(''),

    employee: new FormControl('', [Validators.required]),
    employeeIds: new FormArray([new FormControl('')]),
  });

  filteredProfiles: any = [];

  employees: any = [];

  durations = generateDuration();

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

  override getData(): void {
    this.getEmployees()
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

  save(reservation: any) {
    this.api.saveReservation(
        Reservation.mapForRequest(this.reservationForm.value)
    ).subscribe((data)=>{
      this.onSave.emit();
      this.closeModal(data);
    });

  }

  cancel() {
    this.closeModal();
  }

  // External Pages
  openProfileModal(profileId?:number){
    return this.openModal(ProfilesFormComponent, {
      id: profileId,
    }).then((r:any)=> {

      if( r ){
        this.filteredProfiles.push(r);
        const values = this.reservationForm.value;
        values.profileIds.push(r.profileId);
        this.reservationForm.patchValue(values)
      }

    });
  }

  openInCashSystem(reservationId:number){}
  // endregion

  // region Getting custom data
  getEmployees(){
    this.api
        .getEmployees()
            .subscribe((values: any) => (this.employees = values.data));
  }

  @Debounce(300)
  searchProfile(searchTerm: any) {
    this.api
        .searchProfiles(searchTerm)
          .subscribe((values: any) => (this.filteredProfiles = values.data));
  }
  // endregion
}
