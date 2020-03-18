import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusTableComponent } from './coronavirus-table.component';

describe('CoronavirusTableComponent', () => {
  let component: CoronavirusTableComponent;
  let fixture: ComponentFixture<CoronavirusTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
