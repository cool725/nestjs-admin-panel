import { Component, Injector } from '@angular/core';
import { PageController } from '../../../page.controller';
import { BusinessAPI, IBusiness } from '../business-api.service';
import { Debounce } from '../../../../../../../../../../libs/app/common/decorators/app.decorator.debounce';
import { ITableBaseFilter, Table } from '@movit/app/common';
import { Confirmable } from '../../../../../../../../../../libs/app/common/decorators';

@Component({
  selector: 'movit-settings-overview',
  templateUrl: './business-overview.component.html',
  styleUrls: ['./business-overview.component.css'],
})
export class BusinessOverviewComponent extends PageController {
  public businessTable = new Table<IBusiness, ITableBaseFilter>(
    this.api.businesses$,
    {
      searchValue: '',
      keys: ['firstName', 'lastName', 'phone', 'email'],
    }
  );

  constructor(override injector: Injector, public api: BusinessAPI) {
    super(injector);
    console.log(this.businessTable);
  }

  override getData() {
    this.getBusinessList();
  }

  @Debounce(300)
  getBusinessList() {
    this.onLoadAndSetData(
      this.api.getBusinessList(
        this.businessTable.getFilterValuesAsHttpParams()
      ),
      this.api.businesses$
    );
  }

  editBusiness(businessId: number) {
    this.openModal()
  }

  @Confirmable({ title: 'sure?' })
  deleteBusiness(businessId: number) {}
  createBusiness() {}
}
