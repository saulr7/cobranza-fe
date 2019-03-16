import { TestBed } from '@angular/core/testing';

import { OpcionesMenuService } from './opciones-menu.service';

describe('OpcionesMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpcionesMenuService = TestBed.get(OpcionesMenuService);
    expect(service).toBeTruthy();
  });
});
