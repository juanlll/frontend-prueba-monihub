import { TestBed } from '@angular/core/testing';

import { BankAccountsService } from './bankaccounts.service';

describe('BankAccountsService', () => {
  let service: BankAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
