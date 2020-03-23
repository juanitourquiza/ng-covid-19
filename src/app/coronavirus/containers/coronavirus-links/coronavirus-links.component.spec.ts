import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusLinksComponent } from './coronavirus-links.component';

describe('CoronavirusLinksComponent', () => {
  let component: CoronavirusLinksComponent;
  let fixture: ComponentFixture<CoronavirusLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
