import { TestBed, inject } from '@angular/core/testing';

import { AppJsonService } from './app-json.service';

describe('AppJsonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppJsonService]
    });
  });

  it('should be created', inject([AppJsonService], (service: AppJsonService) => {
    expect(service).toBeTruthy();
  }));
});
