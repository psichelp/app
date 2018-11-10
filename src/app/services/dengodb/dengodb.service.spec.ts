import { TestBed, inject } from '@angular/core/testing';

import { DengodbService } from './dengodb.service';

describe('DengodbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DengodbService]
    });
  });

  it('should be created', inject([DengodbService], (service: DengodbService) => {
    expect(service).toBeTruthy();
  }));
});
