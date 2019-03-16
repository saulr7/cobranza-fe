import { TestBed } from '@angular/core/testing';

import { RoleMarcajeService } from './role-marcaje.service';

describe('RoleMarcajeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleMarcajeService = TestBed.get(RoleMarcajeService);
    expect(service).toBeTruthy();
  });
});
