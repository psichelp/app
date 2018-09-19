import { TestBed, inject } from '@angular/core/testing';

import { WhatsAppService } from './whats-app.service';

describe('WhatsAppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WhatsAppService]
    });
  });

  it('should be created', inject([WhatsAppService], (service: WhatsAppService) => {
    expect(service).toBeTruthy();
  }));
});
