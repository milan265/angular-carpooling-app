import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AktivneComponent } from './aktivne.component';

describe('AktivneComponent', () => {
  let component: AktivneComponent;
  let fixture: ComponentFixture<AktivneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AktivneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AktivneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
