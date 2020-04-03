import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusLinksFranceComponent } from './coronavirus-links-france.component';

describe('CoronavirusLinksFranceComponent', () => {
  let component: CoronavirusLinksFranceComponent;
  let fixture: ComponentFixture<CoronavirusLinksFranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusLinksFranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusLinksFranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
