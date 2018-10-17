import { TestBed, inject } from '@angular/core/testing';

import { DataContextService } from './data-context.service';

describe('DataContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataContextService]
    });
  });

  it('should be created', inject([DataContextService], (service: DataContextService) => {
    expect(service).toBeTruthy();
  }));
});
