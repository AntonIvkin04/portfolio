import { TestBed } from '@angular/core/testing';

import { ScrollYServiceService } from './scroll-y-service.service';

describe('ScrollYServiceService', () => {
  let service: ScrollYServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollYServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
