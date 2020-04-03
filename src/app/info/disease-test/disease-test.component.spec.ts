import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseTestComponent } from './disease-test.component';

describe('DiseaseTestComponent', () => {
  let component: DiseaseTestComponent;
  let fixture: ComponentFixture<DiseaseTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
