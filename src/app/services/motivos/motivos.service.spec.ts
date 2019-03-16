import { TestBed } from '@angular/core/testing';

import { MotivosService } from './motivos.service';

describe('MotivosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MotivosService = TestBed.get(MotivosService);
    expect(service).toBeTruthy();
  });
});
