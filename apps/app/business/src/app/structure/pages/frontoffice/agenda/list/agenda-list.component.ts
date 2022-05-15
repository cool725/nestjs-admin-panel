import { Component, Injector } from '@angular/core';
import { PageController } from '../../../page.controller';
import { AgendaAPI} from "../packages/agenda-api.service";
import { ITableBaseFilter, Table} from "@movit/app/common";
import { Profile } from "../../crm/profiles/overview/profiles-overview.component";
import { AgendaFormComponent } from "../form/agenda-form.component";
import { Debounce } from "../../../../../../../../../../libs/app/common/decorators/app.decorator.debounce";

@Component({
  selector: 'movit-agenda',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.css'],
  providers: [],
})
export class AgendaListComponent extends PageController {

  public resTable:Table<any, ITableBaseFilter> = new Table<Profile, ITableBaseFilter>(
      this.api.reservations$,
      {
        searchValue: '',
      }
  )

  constructor(override injector: Injector, protected api: AgendaAPI<any>) {
    super(injector);
    this.resTable.data$.subscribe(
        console.log
    )
  }

  override getData() {
    this.getReservations();
  }

  @Debounce(350)
  getReservations() {
    this.onLoadAndSetData(
        this.api.getReservations(this.resTable.getFilterValuesAsHttpParams()),
        this.api.reservations$
    )
  }

  createReservation(){
    this.editReservation(null)
        .then(()=> this.getReservations())
  }

  editReservation(resId:number | null){
   return this.openModal(AgendaFormComponent,{
      id: resId
    })
  }

}
