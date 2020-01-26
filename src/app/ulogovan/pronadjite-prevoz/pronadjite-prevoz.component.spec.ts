import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PronadjitePrevozComponent } from './pronadjite-prevoz.component';

describe('PronadjitePrevozComponent', () => {
  let component: PronadjitePrevozComponent;
  let fixture: ComponentFixture<PronadjitePrevozComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PronadjitePrevozComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PronadjitePrevozComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
