import { TestBed } from '@angular/core/testing';

import { CoronavirusFranceService } from './coronavirus-france.service';

describe('CoronavirusFranceService', () => {
  let service: CoronavirusFranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoronavirusFranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
