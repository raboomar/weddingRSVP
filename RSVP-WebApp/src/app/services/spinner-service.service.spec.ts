import { TestBed } from '@angular/core/testing';

import { SpinnerServiceService } from './spinner.service';

describe('SpinnerServiceService', () => {
  let service: SpinnerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
