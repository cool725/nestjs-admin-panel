import { Component, Injector, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { SettingUserAPI } from '../../../packages/user-api.service';
import { PageController } from '../../../../../page.controller';
import { of, Subject } from "rxjs";
import { ITableBaseFilter, Table } from "@movit/app/common";
import { Profile } from "../../../../../frontoffice/crm/profiles/packages/profile.class";
import { IOnBoardingTask, UserOnBoardingService } from "./user.onboarding.service";

export const Items: any[] = [
  { path: '/', title: 'End To End Onboarding', icon: 'fa fa-search', class: '' },
  { path: '/', title: 'Account and Users', icon: 'fa fa-search', class: '' },
];




@Component({
  selector: 'movit-user.onboarding',
  templateUrl: './user.onboarding.component.html',
  styleUrls: ['./user.onboarding.component.scss'],
})
export class UserOnboardingComponent extends PageController {
  @ViewChild('sidebarWindow', { read: ElementRef, static: true }) public sidebarWindowReference: ElementRef;

  public tableOnBoarding: Table<IOnBoardingTask, ITableBaseFilter> = new Table<IOnBoardingTask, ITableBaseFilter>(this.api.onBoardingTasks$, {
    searchValue: '',

  })

  menuItems: any[] = [];
  entriesPerPage: number;
  currentPage: number;


  constructor(
    override injector: Injector,
    public userAPI: SettingUserAPI,
    private api: UserOnBoardingService,
    private router: Router,
  ) {
    super(injector);
  }


  getData() {
    this.menuItems = Items;
    this.onLoadAndSetPaginatedData(
      this.api.getOnBoardingTasks(this.tableOnBoarding.getFilterValuesAndPaginationAsHttpParams()),
      this.api.onBoardingTasks$,
      this.tableOnBoarding
    )
  }

  onRefresh() {}


  openNav() {
    this.sidebarWindowReference.nativeElement.style.width = "250px";
  }

  closeNav() {
    this.sidebarWindowReference.nativeElement.style.width = "0px";
  }
}
