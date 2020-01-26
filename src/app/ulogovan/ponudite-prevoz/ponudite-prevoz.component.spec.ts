import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PonuditePrevozComponent } from './ponudite-prevoz.component';

describe('PonuditePrevozComponent', () => {
  let component: PonuditePrevozComponent;
  let fixture: ComponentFixture<PonuditePrevozComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PonuditePrevozComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PonuditePrevozComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
