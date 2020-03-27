import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusStatsComponent } from './coronavirus-stats.component';

describe('CoronavirusStatsComponent', () => {
  let component: CoronavirusStatsComponent;
  let fixture: ComponentFixture<CoronavirusStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
