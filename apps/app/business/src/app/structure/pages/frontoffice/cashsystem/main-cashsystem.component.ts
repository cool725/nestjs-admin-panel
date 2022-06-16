import { Component, Injector } from "@angular/core";
import { PageController } from "../../page.controller";
import { CashSystemItemsService } from "./packages/services/cashsystem.service-items";
import { CashSystemProfileService } from "./packages/services/cashsystem.service-profile";
import { ItemCategory } from "./packages/classes/cashsystem.item.class";
import { CashSystemStore } from "./packages/services/cashsystem.store";
import { CashSystemService } from "./packages/services/cashsystem.service-api";
import { switchMap } from "rxjs";

@Component({
  selector: "movit-main-cashsystem",
  templateUrl: "./main-cashsystem.component.html",
  styleUrls: ["./main-cashsystem.component.scss"],
})
export class MainCashSystemComponent extends PageController {
  constructor(
    override injector: Injector,
    public store: CashSystemStore,
    private api: CashSystemService,
    public itemsService: CashSystemItemsService,
    private profileService: CashSystemProfileService
  ) {
    super(injector);
    this.listen();
  }

  getData(): void {
    this.getSettings();
    this.getAccounts();
    this.getPriceClass();
    this.getServices();
  }

  getServices() {
    this.onLoadAndSetData(
      this.itemsService.getServices(),
      this.itemsService.services$,
      categories => categories.data?.map(ItemCategory.create)
    );
  }

  getSettings() {
    this.onLoadAndSetData(this.api.getSettings(), this.store.settings$);
  }

  getAccounts() {
    this.onLoadAndSetData(this.api.getAccounts(), this.store.accounts$);
  }

  getPriceClass() {
    this.onLoadAndSetData(this.profileService.getPriceClass(), this.store.priceClasses.profiles$);
  }

  listen() {
    this.store.basket.ON.cashOut$
      .pipe(switchMap(basketInfos => this.api.cashout(basketInfos)))
      .subscribe(console.log);
  }
}
