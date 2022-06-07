import { Component, Injector, ViewChild, ElementRef } from '@angular/core';
import { ITableBaseFilter, Table } from '@movit/app/common';
import { PageController } from '../../../../../page.controller';
import { IOnBoardingTask, UserOnBoardingService } from './user.onboarding.service';

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

  public menuItems: any[] = Items;
  public tableOnBoarding: Table<IOnBoardingTask, ITableBaseFilter> = new Table<IOnBoardingTask, ITableBaseFilter>(this.api.onBoardingTasks$, {
    searchValue: '',
  })

  constructor(
    override injector: Injector,
    private api: UserOnBoardingService,
  ) {
    super(injector);
  }

  getData() {
    this.onLoadAndSetPaginatedData(
      this.api.getOnBoardingTasks(this.tableOnBoarding.getFilterValuesAndPaginationAsHttpParams()),
      this.api.onBoardingTasks$,
      this.tableOnBoarding
    );
  }

  openNav() {
    this.sidebarWindowReference.nativeElement.style.width = "250px";
  }

  closeNav() {
    this.sidebarWindowReference.nativeElement.style.width = "0px";
  }
}
