import { Injectable, NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdbSharedModule } from '@movit/app/ui';

import { UserOnboardingComponent } from './user.onboarding.component';
import { BehaviorSubject, of } from "rxjs";
import { ITableOptions } from "@movit/app/common";
import { HttpParams } from "@angular/common/http";

export class IOnBoardingTask {
   id: number;
   title: string;
   description: string;
 }
@Injectable()
export class UserOnBoardingService {

  onBoardingTasks$ = new BehaviorSubject<ITableOptions<IOnBoardingTask>>(
      null
  );

  getOnBoardingTasks(httpParams:HttpParams){
   return of({
      currentPage: 0,
      perPage: 0,
      total: 0,
      data:    [
        {
          id: 1,
          title: 'Onboarding 1',
          description: 'Description 1'
        },
        {
          id: 2,
          title: 'Onboarding 2',
          description: 'Description 2'
        },
        {
          id: 3,
          title: 'Onboarding 3',
          description: 'Description 3'
        },
        {
          id: 4,
          title: 'Onboarding 4',
          description: 'Description 4'
        },
        {
          id: 5,
          title: 'Onboarding 5',
          description: 'Description 5'
        }
      ]
    })
  }
}
