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
      currentPage: 1,
      perPage: 10,
      total: 5,
     count:5,

      data:    [
        {
          id: 1,
          title: 'User Creation',
          description: 'Description 1'
        },
        {
          id: 2,
          title: 'Roles',
          description: 'Description 2'
        },
        {
          id: 3,
          title: 'Shiftplan & Availability',
          description: 'Description 3'
        },
        {
          id: 4,
          title: 'Services',
          description: 'Description 4'
        }
      ]
    })
  }
}
