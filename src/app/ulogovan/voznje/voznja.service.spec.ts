import { TestBed } from '@angular/core/testing';

import { VoznjaService } from './voznja.service';

describe('VoznjaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VoznjaService = TestBed.get(VoznjaService);
    expect(service).toBeTruthy();
  });
});
