import { Component, Injector } from '@angular/core';
import { PageController } from '../../../../page.controller';
import { ITableBaseFilter, Table } from '@movit/app/common';
import { Confirmable } from '../../../../../../../../../../../libs/app/common/decorators';
import { ProfilePriceClassAPI } from '../packages/profile-price-class-api.service';

export class PriceClass {
  priceClassId: number;
  companyId: number;

  title: string;
  standard: string;
  color: string;
  isPercentage?: boolean;
  value: number;

  static create(params: Partial<PriceClass>) {
    return Object.assign(new PriceClass(), params);
  }
}

@Component({
  selector: 'movit-profiles-price-class-overview',
  templateUrl: './profiles-price-class-overview.component.html',
  styleUrls: ['./profiles-price-class-overview.component.css'],
})
export class ProfilesPriceClassOverviewComponent extends PageController {
  public profilePriceClassTable = new Table<PriceClass, ITableBaseFilter>(
    this.api.profilePriceClasses$
  );

  constructor(
    override injector: Injector,
    public api: ProfilePriceClassAPI<PriceClass, any>
  ) {
    super(injector);
  }

  getData(): void {
    this.onLoadAndSetData(
      this.api.getPriceClasses(),
      this.api.profilePriceClasses$,
      (rows: any) => ({
        data: rows,
      })
    );
  }

  createPriceClass() {
    this.api.profilePriceClass$.next(new PriceClass());
  }

  async editPriceClass(id: number) {
    // load segment by api
    this.api.getPriceClass(id).subscribe((resss: any) => {
      this.api.profilePriceClass$.next(resss);
    });
  }

  @Confirmable({ title: 'Sure?' })
  async deleteProfilePriceClass(id: number) {
    await this.api.deletePriceClass(id).subscribe(() => this.reloadData());
  }

  // closePopup() {
  //   this.api.profilePriceClass$.next(null);
  // }
}
