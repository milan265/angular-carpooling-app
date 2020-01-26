import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsloviKoriscenjaComponent } from './uslovi-koriscenja.component';

describe('UsloviKoriscenjaComponent', () => {
  let component: UsloviKoriscenjaComponent;
  let fixture: ComponentFixture<UsloviKoriscenjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsloviKoriscenjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsloviKoriscenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
