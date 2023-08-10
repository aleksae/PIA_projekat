import { TestBed } from '@angular/core/testing';

import { PrijavljivanjeServiceService } from './prijavljivanje-service.service';

describe('PrijavljivanjeServiceService', () => {
  let service: PrijavljivanjeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrijavljivanjeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
