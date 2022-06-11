import { Component, Injector, ViewChild, ElementRef } from '@angular/core';
import { ITableBaseFilter, Table } from '@movit/app/common';
import { PageController } from '../../../../page.controller';
import { IOnBoardingTask, UserOnBoardingUserService } from './user-on-boarding-user.service';

export const Items: any[] = [
  /*
   { path: '/', title: 'End To End Onboarding', icon: 'fa fa-search', class: '' },
  { path: '/', title: 'Account and Users', icon: 'fa fa-search', class: '' },
  * */
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
    private api: UserOnBoardingUserService,
  ) {
    super(injector);
  }

  getData(resetPagination = false) {
    this.onLoadAndSetPaginatedData(
      this.api.getOnBoardingTasks(this.tableOnBoarding.getFilterValuesAndPaginationAsHttpParams({resetPagination})),
      this.api.onBoardingTasks$,
      this.tableOnBoarding
    );
  }

  createNewUser(){
    // show user creation forms
    // nav back to here and assign user to form
  }

  assignUser(userId?:number){
    // if id then do nothing
    // if no id then show user selection
  }
}
