import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusMapComponent } from './coronavirus-map.component';

describe('CoronavirusMapComponent', () => {
  let component: CoronavirusMapComponent;
  let fixture: ComponentFixture<CoronavirusMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
