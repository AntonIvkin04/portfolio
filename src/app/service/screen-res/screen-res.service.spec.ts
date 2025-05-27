import { TestBed } from '@angular/core/testing';

import { ScreenResService } from './screen-res.service';

describe('ScreenResService', () => {
  let service: ScreenResService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenResService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
