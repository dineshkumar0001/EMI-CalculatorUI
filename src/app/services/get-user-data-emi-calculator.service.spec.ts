import { TestBed } from '@angular/core/testing';

import { GetUserDataEmiCalculatorService } from './get-user-data-emi-calculator.service';

describe('GetUserDataEmiCalculatorService', () => {
  let service: GetUserDataEmiCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserDataEmiCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
