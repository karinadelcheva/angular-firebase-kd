import { TestBed } from '@angular/core/testing';

import { BusinessPartnersService } from './business-partners.service';

describe('BusinessPartnersService', () => {
  let service: BusinessPartnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessPartnersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
