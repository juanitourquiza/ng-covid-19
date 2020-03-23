import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GouvComponent } from './gouv.component';

describe('GouvComponent', () => {
  let component: GouvComponent;
  let fixture: ComponentFixture<GouvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GouvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GouvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
