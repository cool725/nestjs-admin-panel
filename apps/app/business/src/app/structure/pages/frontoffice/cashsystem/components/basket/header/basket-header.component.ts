import { Component, Injector } from "@angular/core";
import { CashSystemItemsService } from "../../../packages/services/cashsystem.service-items";
import { CashSystemProfileService } from "../../../packages/services/cashsystem.service-profile";
import { Debounce } from "@movit/app/common";
import {CashSystemStore} from "../../../packages/services/cashsystem.store";

@Component({
  selector: 'movit-cashsystem-basket-header',
  templateUrl: './basket-header.component.html',
  styleUrls: ['./basket-header.component.scss'],
})
export class CashSystemBasketHeaderComponent {

  filteredProfiles
  constructor(
    private store: CashSystemStore,
    private itemsService: CashSystemItemsService,
    private profileService: CashSystemProfileService,

  ) { }

  @Debounce(300)
  searchProfile(searchTerm: any) {
    if(searchTerm ){
      this.profileService
        .searchProfiles(searchTerm)
        .subscribe((values: any) => (this.filteredProfiles = values.data));
    }else this.filteredProfiles = []
  }
}
