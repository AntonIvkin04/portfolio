import { TestBed } from '@angular/core/testing';

import { LanguageDecService } from './language-dec.service';

describe('LanguageDecService', () => {
  let service: LanguageDecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageDecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
