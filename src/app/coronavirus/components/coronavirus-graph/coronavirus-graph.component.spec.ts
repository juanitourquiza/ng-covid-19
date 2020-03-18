import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusGraphComponent } from './coronavirus-graph.component';

describe('CoronavirusGraphComponent', () => {
  let component: CoronavirusGraphComponent;
  let fixture: ComponentFixture<CoronavirusGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
