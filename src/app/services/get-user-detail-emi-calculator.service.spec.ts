import { TestBed } from '@angular/core/testing';

import { GetUserDetailEmiCalculatorService } from './get-user-detail-emi-calculator.service';

describe('GetUserDetailEmiCalculatorService', () => {
  let service: GetUserDetailEmiCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserDetailEmiCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
