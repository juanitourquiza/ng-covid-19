import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviseComponent } from './advise.component';

describe('AdviseComponent', () => {
  let component: AdviseComponent;
  let fixture: ComponentFixture<AdviseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdviseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
