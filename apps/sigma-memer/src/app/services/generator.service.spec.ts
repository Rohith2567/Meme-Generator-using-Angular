import { TestBed } from '@angular/core/testing';

import { GeneratorService } from './generator.service';

describe('Generator', () => {
  let service: GeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
