import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusChartGenderComponent } from './coronavirus-chart-gender.component';

describe('CoronavirusChartGenderComponent', () => {
  let component: CoronavirusChartGenderComponent;
  let fixture: ComponentFixture<CoronavirusChartGenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusChartGenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusChartGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
