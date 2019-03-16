import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoEmpleadosComponent } from './mantenimiento-empleados.component';

describe('MantenimientoEmpleadosComponent', () => {
  let component: MantenimientoEmpleadosComponent;
  let fixture: ComponentFixture<MantenimientoEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
