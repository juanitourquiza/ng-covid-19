import { TestBed } from '@angular/core/testing';

import { CoronavirusService } from './coronavirus.service';

describe('CoronavirusService', () => {
  let service: CoronavirusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoronavirusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
