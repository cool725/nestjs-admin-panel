import { Component, Injector } from '@angular/core';
import { PageController } from '../../../page.controller';
import { AgendaAPI } from '../packages/agenda-api.service';
import { ITableBaseFilter, Table } from '@movit/app/common';
import { AgendaFormComponent } from '../form/agenda-form.component';
import { Debounce } from '../../../../../../../../../../libs/app/common/decorators/app.decorator.debounce';

interface IResTableBaseFilter extends ITableBaseFilter{
  customSearch?: {
    title?: string
  }
}

@Component({
  selector: 'movit-agenda',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.css'],
  providers: [],
})
export class AgendaListComponent extends PageController {
  public resTable: Table<any, IResTableBaseFilter> = new Table<
    any, ITableBaseFilter
  >(this.api.reservations$, {
    customSearch: {
      title:''
    },
  });

  constructor(override injector: Injector, protected api: AgendaAPI<any>) {
    super(injector);
  }

  override getData() {
    this.getReservations();
  }

  @Debounce(350)
  getReservations() {
    this.onLoadAndSetData(
      this.api.getReservationList(this.resTable.getFilterValuesAsHttpParams()),
      this.api.reservations$
    );
  }

  createReservation() {
    this.editReservation(null).then(() => this.getReservations());
  }

  editReservation(resId: number | null) {
    return this.openModal(AgendaFormComponent, {
      id: resId,
    });
  }
}
