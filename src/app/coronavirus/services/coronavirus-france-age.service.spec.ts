import { TestBed } from '@angular/core/testing';

import { CoronavirusFranceAgeService } from './coronavirus-france-age.service';

describe('CoronavirusFranceAgeService', () => {
  let service: CoronavirusFranceAgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoronavirusFranceAgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
