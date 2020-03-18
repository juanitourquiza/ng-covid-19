import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusColumnComponent } from './coronavirus-column.component';

describe('CoronavirusColumnComponent', () => {
  let component: CoronavirusColumnComponent;
  let fixture: ComponentFixture<CoronavirusColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
