import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusSelectComponent } from './coronavirus-select.component';

describe('CoronavirusSelectComponent', () => {
  let component: CoronavirusSelectComponent;
  let fixture: ComponentFixture<CoronavirusSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
