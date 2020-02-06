import { TestBed } from '@angular/core/testing';

import { PorukaService } from './poruka.service';

describe('PorukaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PorukaService = TestBed.get(PorukaService);
    expect(service).toBeTruthy();
  });
});
