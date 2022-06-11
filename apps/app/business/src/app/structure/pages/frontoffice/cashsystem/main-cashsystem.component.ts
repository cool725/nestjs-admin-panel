import {Component, Injector} from '@angular/core';
import { PageController } from '../../page.controller';
import {CashSystemSettingsService} from "./packages/services/cashsystem.service-settings";
import { CashSystemItemsService } from "./packages/services/cashsystem.service-items";
import { CashSystemProfileService } from "./packages/services/cashsystem.service-profile";

@Component({
  selector: 'movit-main-cashsystem',
  templateUrl: './main-cashsystem.component.html',
  styleUrls: ['./main-cashsystem.component.scss'],
})
export class MainCashSystemComponent extends PageController {

  constructor(
      override injector: Injector,
      private settings: CashSystemSettingsService,
      public itemsService: CashSystemItemsService,
      private profileService: CashSystemProfileService,

  ) {
    super(injector);

  }

  getData(): void {
    this.getSettings()
    this.getServices()
  }

  getServices(){
    this.onLoadAndSetData(
      this.itemsService.getServices(),
      this.itemsService.services$,
        (categories) => categories.data
    )
  }

  getSettings(){
    this.onLoadAndSetData(
      this.settings.getSettings(),
      this.settings.settings$
    )
  }
}
