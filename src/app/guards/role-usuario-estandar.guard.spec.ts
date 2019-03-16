import { TestBed, async, inject } from '@angular/core/testing';

import { RoleUsuarioEstandarGuard } from './role-usuario-estandar.guard';

describe('RoleUsuarioEstandarGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleUsuarioEstandarGuard]
    });
  });

  it('should ...', inject([RoleUsuarioEstandarGuard], (guard: RoleUsuarioEstandarGuard) => {
    expect(guard).toBeTruthy();
  }));
});
