import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OceniVoznjuComponent } from './oceni-voznju.component';

describe('OceniVoznjuComponent', () => {
  let component: OceniVoznjuComponent;
  let fixture: ComponentFixture<OceniVoznjuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OceniVoznjuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OceniVoznjuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
