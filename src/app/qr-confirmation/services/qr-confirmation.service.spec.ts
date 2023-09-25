/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QrConfirmationService } from './qr-confirmation.service';

describe('Service: QrConfirmation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QrConfirmationService]
    });
  });

  it('should ...', inject([QrConfirmationService], (service: QrConfirmationService) => {
    expect(service).toBeTruthy();
  }));
});
