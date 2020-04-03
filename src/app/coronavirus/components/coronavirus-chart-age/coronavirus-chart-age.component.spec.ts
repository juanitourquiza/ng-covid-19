import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusChartAgeComponent } from './coronavirus-chart-age.component';

describe('CoronavirusChartAgeComponent', () => {
  let component: CoronavirusChartAgeComponent;
  let fixture: ComponentFixture<CoronavirusChartAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusChartAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusChartAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
