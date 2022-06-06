import { Component, Injector, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { SettingUserAPI } from '../../../packages/user-api.service';
import { PageController } from '../../../../../page.controller';
import { Subject } from 'rxjs';

export const Items: any[] = [
  { path: '/', title: 'End To End Onboarding', icon: 'fa fa-search', class: '' },
  { path: '/', title: 'Account and Users', icon: 'fa fa-search', class: '' },
];

export interface IPaginationModel {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
}

interface ITableData {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'movit-user.onboarding',
  templateUrl: './user.onboarding.component.html',
  styleUrls: ['./user.onboarding.component.scss'],
})
export class UserOnboardingComponent extends PageController {
  @ViewChild('sidebarWindow', { read: ElementRef, static: true }) public sidebarWindowReference: ElementRef;

  inventionUsers$ = new Subject<any[]>();
  title: string = 'Onboarding Table';
  tableData: ITableData[] = [];
  menuItems: any[] = [];
  entriesPerPage: number;
  currentPage: number;
  pager: IPaginationModel;

  constructor(
    override injector: Injector,
    public userAPI: SettingUserAPI,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    super(injector);
    this.getData();
  }

  calculatePagination(totalItems: number, currentPage: number = 1, pageSize: number = 10): IPaginationModel {
    const totalPages: number = Math.ceil(totalItems / pageSize);
    let _currentPage: number = currentPage;

    if (_currentPage < 1) {
      _currentPage = 1;
    } else if (_currentPage > totalPages) {
      _currentPage = totalPages;
    }

    let startPage: number, endPage: number;

    const columns: number = 6;
    const middle: number = Math.ceil(columns / 2);

    if (totalPages <= columns) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (_currentPage <= middle + 1) {
        startPage = 1;
        endPage = columns;
      } else if (_currentPage + middle - 1 >= totalPages) {
        startPage = totalPages - (columns - 1);
        endPage = totalPages;
      } else {
        startPage = _currentPage - middle;
        endPage = _currentPage + middle - 1;
      }
    }

    const startIndex: number = (_currentPage - 1) * pageSize;
    const endIndex: number = Math.min(startIndex + pageSize - 1, totalItems - 1);

    const getNextPage: any = (i: number): number => {
      return startPage + i;
    };

    const pages: any = Array.from(Array(endPage + 1 - startPage).keys()).map(getNextPage);

    return {
      totalItems: totalItems,
      currentPage: _currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  getData() {
    this.menuItems = Items;
    this.pager = this.calculatePagination(this.tableData.length, this.currentPage, this.entriesPerPage);
    this.tableData = [
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
    ];
  }

  onRefresh() {}

  setPage(page: number): void {
    const limit: number = this.entriesPerPage;

    this.currentPage = page;

    const routeParams: NavigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: {
        limit: limit,
        skip: page
      },
      queryParamsHandling: 'merge',
      replaceUrl: true
    };

    const onRouteDone = (): void => { };

    const onError = (err: any): void => {
      console.log('[UserOnboardingComponent setPage] onError', err);
    }

    this.router
      .navigate(['.'], routeParams)
      .then(onRouteDone)
      .catch(onError);
  }

  openNav() {
    this.sidebarWindowReference.nativeElement.style.width = "250px";
  }

  closeNav() {
    this.sidebarWindowReference.nativeElement.style.width = "0px";
  }
}
