import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoznjeComponent } from './voznje.component';

describe('VoznjeComponent', () => {
  let component: VoznjeComponent;
  let fixture: ComponentFixture<VoznjeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoznjeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoznjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
