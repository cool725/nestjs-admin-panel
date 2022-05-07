import { TestBed } from '@angular/core/testing';

import { AgendaAPI } from './agenda.api.service';

describe('Agenda.ApiService', () => {
  let service: AgendaAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendaAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
